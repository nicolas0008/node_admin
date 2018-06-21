import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Dto with the ID of the new document
 *
 * @class DocumentCreatedDto
 */
export class DocumentCreatedDto {
    constructor(id: string) {
        this.id = id;
    }

    @ApiModelProperty()
    id: string;
}