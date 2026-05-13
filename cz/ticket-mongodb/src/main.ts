import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// ลบ import dotenv และ dotenv.config() ออก

console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

console.log('**************************************************************');
console.log('Starting Backend...AT PORT:', process.env.PORT ?? 3000);
console.log('**************************************************************');
void bootstrap();