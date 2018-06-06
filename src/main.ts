import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import * as ESHelper from './database/elasticsearch.helper';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Termmed API')
        .setDescription('The Termspace API description')
        .setVersion('1.0')
        .addTag('Users')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    ESHelper.initClient('https://elastic:F7pBlVF1OZL39j515vSIlrrF@3fc4d279e6cf43f29ea6239b8a6f370e.sa-east-1.aws.found.io:9243');

    await app.listen(3000);
}
bootstrap();
