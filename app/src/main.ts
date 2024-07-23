import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Tardigrade API')
    .setDescription('The Tardigrade API description')
    .setVersion('1.0')
    .addTag('tardigrade')
    .build();

  const app = await NestFactory.create(AppModule, { cors: true });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
