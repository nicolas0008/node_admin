import { HttpStatus } from '@nestjs/common';
import { PassiveException } from './passive.exception';

export class ElasticSearchException extends PassiveException {
    constructor(error?: any) {
        super(
            'ElasticSearchException',
            HttpStatus.INTERNAL_SERVER_ERROR,
            error
        );
    }
}
