import { defer } from 'rxjs';

export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

export function asyncError(error: any) {
    return defer(() => Promise.reject(error));
}
