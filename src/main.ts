import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger documentation
  if (false && process.env.NODE_ENV == 'development') {
    const config = new DocumentBuilder()
      .setTitle('Nestjs')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('nestjs')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
}
bootstrap();

