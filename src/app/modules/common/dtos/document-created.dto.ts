import { ApiModelProperty } from '@nestjs/swagger';

export class DocumentCreatedDto {
    constructor(id: string) {
        this.id = id;
    }

    @ApiModelProperty()
    id: string;
}