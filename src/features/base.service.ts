export class BaseService {
    log(): boolean {
        return true;
    }

    removeEmptyAttr(obj: any): {} {
        Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        return obj;
    }

    directMapping<T>(input: any, classType: new() => T ): T {
        const output = new classType();
        Object.keys(input).filter(key => key in output).forEach(key => {
            output[key] = input[key];
        });
        return output;
    }
}
