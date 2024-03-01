import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { AppModule } from './modules/app/app.module';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        dismissDefaultMessages: true,
        validationError: { target: false },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Social media api')
      .setDescription('The social media API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    cachedServer = serverlessExpress({
      app: app.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
