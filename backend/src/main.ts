import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { XssSanitizationMiddleware } from './common/middleware/xss-sanitization.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app =
        await NestFactory.create<NestExpressApplication>(
            AppModule
        );


    app.enableCors({
        origin: true,
        credentials: true,
    });

    // ⭐ HELMET - Security Headers
app.use(
    helmet({
        crossOriginResourcePolicy: false,

        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],

                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com"
                ],

                fontSrc: [
                    "'self'",
                    "https://fonts.gstatic.com"
                ],

                imgSrc: [
                    "'self'",
                    "data:",
                    "blob:",
                    "http:",
                    "https:"
                ],

                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'"
                ]
            }
        }
    })
);

    // ⭐ CORS - Origins específicos
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173',
            'http://localhost:3001',],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // ⭐ Global Validation Pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove props not in DTO
            forbidNonWhitelisted: true, // Throw error if unknown props
            transform: true, // Auto transform to DTO types
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // ⭐ XSS Sanitization Middleware
    const xssMiddleware = new XssSanitizationMiddleware();
    app.use(xssMiddleware.use.bind(xssMiddleware));



    // ⭐ Hide X-Powered-By header
    app.getHttpAdapter().getInstance().disable('x-powered-by');



    const config = new DocumentBuilder()
        .setTitle('BIGBOSS TECH API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    app.useStaticAssets(
        join(
            process.cwd(),
            'uploads'
        ),
        {
            prefix: '/uploads/',
        },
    );

    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 BIGBOSS TECH API                                 ║
║   📍 Running on: http://localhost:${port}                ║
║   🔐 Security: Helmet + JWT + Rate Limiting           ║
║   📊 Database: MongoDB + Prisma                       ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
}
bootstrap();