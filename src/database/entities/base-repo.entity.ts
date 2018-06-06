export class BaseRepoEntity<T> {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: number;
        max_score: number;
        hits: [{
            _id: string;
            _source: T;
            _index: string;
            _score: number;
            _type: string;
        }];
    };
}