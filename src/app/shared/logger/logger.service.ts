import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { Logger } from 'winston';

/**
 * Logger Service
 *
 * @class LoggerService
 */
export class WinstonLoggerService implements LoggerService {
    private readonly logger: Logger;

    constructor(private context: string = 'No Context') {
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY/MM/DD HH:mm:ss'
                }),
                this.myCustomFormat()
            ),
            transports: [
                new winston.transports.Console({ handleExceptions: true }),
            ]
        });
    }

    error(message: string, trace?: string) {
        this.logger.error(message, { context: this.context });
    }

    debug(message: string) {
        this.logger.debug(message, { context: this.context });
    }

    warn(message: string) {
        this.logger.warn(message, { context: this.context });
    }

    log(message: string) {
        this.logger.log('info', message, { context: this.context });
    }

    info(message: string) {
        this.logger.info(message, { context: this.context });
    }

    silly(message: string) {
        this.logger.silly(message, { context: this.context });
    }

    private readonly myCustomFormat = () => winston.format.printf(info => {
        const typeFormatted = () => {
            switch (info.level) {
                case 'info':
                    return `\x1b[1;32m[${info.level.toUpperCase()}]: \x1b[0m\x1b[32m${info.message}\x1b[0m`;
                case 'warn':
                    return `\x1b[1;35m[${info.level.toUpperCase()}]: \x1b[0m\x1b[35m${info.message}\x1b[0m`;
                case 'error':
                    return `\x1b[1;31m[${info.level.toUpperCase()}]: \x1b[0m\x1b[31m${info.message}\x1b[0m`;
                case 'debug':
                    return `\x1b[1;34m[${info.level.toUpperCase()}]: \x1b[0m\x1b[34m${info.message}\x1b[0m`;
                case 'silly':
                    return `\x1b[1;34m[${info.level.toUpperCase()}]: \x1b[0m\x1b[34m${info.message}\x1b[0m`;
            }
        };
        return `\x1b[31m[${info.context.toUpperCase()}]\x1b[0m ${info.timestamp} - ${typeFormatted()}`;
    })
}
