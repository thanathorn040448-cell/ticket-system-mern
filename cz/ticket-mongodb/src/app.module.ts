import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { Event } from './events/event.entity';
import { User } from './users/user.entity';
import { BookingsModule } from "./bookings/bookings.module";
import { Booking } from "./bookings/booking.entity";
import { ArtistsModule } from "./artists/artists.module";
import { Artist } from "./artists/artist.entity";
import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { LoggerModule } from 'nestjs-pino';


@Module({
    imports: [


        LoggerModule.forRoot({
            pinoHttp: {
                level: process.env.LOG_LEVEL ?? 'info',
                // บรรทัด access log ให้เหลือแค่ level / req / res / responseTime แบบ JSON (เหมาะกับ Loki)
                base: undefined,
                timestamp: false,
                serializers: {
                    req(serialized) {
                        return {
                            method: serialized.method,
                            url: serialized.url,
                        };
                    },
                    res(serialized) {
                        return { statusCode: serialized.statusCode };
                    },
                },
                customSuccessMessage: () => undefined as unknown as string,
                customErrorMessage: () => undefined as unknown as string,
            },
        }),
        
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: {
                enabled: true,
            },
        }),

        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGO_URI, // เราจะใช้ URL ตัวเดียวจบ ไม่แยก host/port แล้ว
          
           
            entities: [Event, User, Booking, Artist],
            synchronize: true, // ตัวนี้จะช่วยสร้าง Table/Collection ให้เองอัตโนมัติ
          }),
        EventsModule,
        AuthModule,
        BookingsModule,
        ArtistsModule
    ],

    controllers: [AppController],
    providers: [
        AppService,
        makeCounterProvider({
            name: 'http_api_errors',
            help: 'Count of HTTP API errors (status >= 400)',
            labelNames: ['method', 'api_kind', 'status'],
        }),
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule { }