import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import type { Counter } from 'prom-client';
import type { Request, Response } from 'express';

const REDACT_KEYS = new Set([
  'password',
  'token',
  'accesstoken',
  'refreshtoken',
  'authorization',
  'secret',
]);

const MAX_BODY_JSON_LENGTH = 4096;

function sanitizeBody(body: unknown): unknown {
  if (body === null || body === undefined) {
    return body;
  }
  if (Array.isArray(body)) {
    return body;
  }
  if (typeof body !== 'object') {
    return body;
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
    out[k] = REDACT_KEYS.has(k.toLowerCase()) ? '[REDACTED]' : v;
  }
  let serialized = JSON.stringify(out);
  if (serialized.length > MAX_BODY_JSON_LENGTH) {
    return {
      _truncated: true,
      preview: serialized.slice(0, MAX_BODY_JSON_LENGTH),
    };
  }
  return out;
}

function apiKindFromPath(path: string): string {
  const parts = path.replace(/^\//, '').split('/').filter(Boolean);
  return parts[0] ?? 'root';
}

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectMetric('http_api_errors')
    private readonly httpApiErrors: Counter<'method' | 'api_kind' | 'status'>,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const path = req.path || req.url?.split('?')[0] || '/';
    const apiKind = apiKindFromPath(path);

    let msg: string;
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') {
        msg = body;
      } else if (body && typeof body === 'object') {
        const m = (body as { message?: unknown }).message;
        msg = Array.isArray(m) ? m.join('; ') : String(m ?? JSON.stringify(body));
      } else {
        msg = exception.message;
      }
    } else if (exception instanceof Error) {
      msg = exception.message;
    } else {
      msg = 'Internal error';
    }

    if (status >= 400) {
      const logLine = {
        level: 'error',
        method: req.method,
        path,
        status,
        apiKind,
        body: sanitizeBody(req.body),
        msg,
      };
      process.stdout.write(`${JSON.stringify(logLine)}\n`);

      this.httpApiErrors.inc({
        method: req.method,
        api_kind: apiKind,
        status: String(status),
      });
    }

    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      res
        .status(status)
        .json(
          typeof body === 'string'
            ? { statusCode: status, message: body }
            : body,
        );
      return;
    }

    res.status(status).json({
      statusCode: status,
      message: 'Internal server error',
    });
  }
}
