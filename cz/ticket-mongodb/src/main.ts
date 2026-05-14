import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

// ลบ import dotenv และ dotenv.config() ออก



async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
      });
    app.useLogger(app.get(Logger));
    const logger = app.get(Logger);
    app.enableCors({
        origin: true, // อนุญาตทุกแหล่งที่มา หรือจะใส่ ['https://your-frontend-url.onrender.com'] ก็ได้
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

    logger.log(`Backend started on port ${process.env.PORT ?? 3000}`);
}


void bootstrap();