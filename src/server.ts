import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setBasePath('./')
        .setTitle('Termmed API')
        .setDescription('The Termspace API description')
        .setVersion('1.0')
        .addTag('Auth', 'Authorization Module')
        .addTag('Features', 'Features Module')
        .addTag('Roles', 'Roles Module')
        .addTag('Users', 'Users Module')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();