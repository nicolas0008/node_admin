import { Injectable } from '@nestjs/common';

import * as ESHelper from '../elasticsearch/elasticsearch.helper';
import { Users } from '../elasticsearch/entities/users.entity';

@Injectable()
export class UsersService {
    async create() {
        ESHelper.esClient.create({
            index: 'user',
            type: 'users',
            id: '2',
            body: {
                firstName: 'Test 1',
                lastName: 'b',
            },
        }).then(body => {
            const hits = body.hits.hits;
        }, error => {
            // console.trace(error.message);
        });
    }

    async get() {
        return ESHelper.search('firstName', 'Test 1', Users);
    }
}
