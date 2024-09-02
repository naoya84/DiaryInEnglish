import {Http, NetworkHttp} from "../http/Http.ts";

export interface TranslateRepository {
    translate(word: string): Promise<string>
}

export class DefaultTranslateRepository implements TranslateRepository{
    http: Http

    constructor(http: Http = new NetworkHttp()) {
        this.http = http
    }

    translate(word: string): Promise<string> {
        return this.http.translate(word) as Promise<string>
    }
}
