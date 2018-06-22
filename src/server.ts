import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { WinstonLoggerService } from './app/shared/logger/logger.service';

async function bootstrap() {
    const winstonLogger = new WinstonLoggerService('Main');
    const app = await NestFactory.create(AppModule, {
        logger: winstonLogger
    });

    const options = new DocumentBuilder()
        .setBasePath('./')
        .setTitle('Termmed API')
        .setDescription('The Termspace API description')
        .setVersion('1.0')
        .addTag('Auth', 'Authorization Module')
        .addTag('Features', 'Features Module')
        .addTag('Roles', 'Roles Module')
        .addTag('Users', 'Users Module')
        .addTag('Projects', 'Projects Module')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
