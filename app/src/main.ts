import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { uid } from './common/middleware/uid.middleware';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true
  });
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe());
  app.use(uid);

  const options = new DocumentBuilder()
    .setTitle('API Users')
    .setDescription('API Users manages users, billing data, shipping address resources')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
