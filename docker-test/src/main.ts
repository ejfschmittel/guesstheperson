import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const corsOptions = process.env.NODE_ENV === "production" ? {
  origin: 'https://ejfschmittel.github.io/',
  credentials: true,
}:{
  origin: 'http://localhost:3000',
    credentials: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors(corsOptions)

  

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
