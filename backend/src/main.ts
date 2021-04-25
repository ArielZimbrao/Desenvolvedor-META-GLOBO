import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const options = new DocumentBuilder()
    .setTitle('Globo Analytics')
    .setDescription('globo analytics api description')
    .setVersion('1.0')
    .addTag('analytics-api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  
  await app.listen(parseInt(process.env.APP_PORT, 10) || 3000, '0.0.0.0');
}
bootstrap();
