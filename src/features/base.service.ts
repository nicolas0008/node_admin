export class BaseService {
    log(): boolean {
        return true;
    }

    removeEmptyAttr(obj: any): {} {
        Object.keys(obj).forEach(k => (!obj[k] && obj[k] !== undefined) && delete obj[k]);
        return obj;
    }
}
