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


@Module({
    imports: [
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: {
                enabled: true,
            },
        }),

        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '27017', 10),
            database: process.env.DB_NAME || 'Ticket-System',
            entities: [Event, User, Booking, Artist],
            synchronize: true,         // เปิดก่อนเพื่อ debug
            
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