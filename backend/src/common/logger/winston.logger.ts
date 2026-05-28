import * as winston from 'winston';
import 'winston-daily-rotate-file';

const errorFileRotateTransport = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
});

const combinedFileRotateTransport = new winston.transports.File({
    filename: 'logs/combined.log',
});

const securityFileRotateTransport = new winston.transports.File({
    filename: 'logs/security.log',
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        errorFileRotateTransport,
        combinedFileRotateTransport,
        securityFileRotateTransport,
    ],
});

// Exceptions
logger.exceptions.handle(
    new winston.transports.File({
        filename: 'logs/exceptions.log',
    }),
);

// Rejections
logger.rejections.handle(
    new winston.transports.File({
        filename: 'logs/rejections.log',
    }),
);

export const logInfo = (message: string, meta?: any) => {
    logger.info(message, meta);
};

export const logError = (
    message: string,
    error?: Error,
    meta?: any,
) => {
    logger.error(message, {
        error: error?.message,
        stack: error?.stack,
        ...meta,
    });
};

export const logWarn = (message: string, meta?: any) => {
    logger.warn(message, meta);
};

export const logDebug = (message: string, meta?: any) => {
    logger.debug(message, meta);
};

export const logSecurityEvent = (
    event: string,
    details: any,
) => {
    logger.warn(`[SECURITY] ${event}`, {
        type: 'security',
        event,
        ...details,
        timestamp: new Date().toISOString(),
    });
};

console.log('✅ Winston logger initialized');