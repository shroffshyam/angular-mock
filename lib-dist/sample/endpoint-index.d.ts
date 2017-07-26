import { RequestMethod } from '@angular/http';
export declare const endPointIndex: {
    'name': string;
    'method': RequestMethod;
    'regex': RegExp;
    'value': {
        "page": string;
        "per_page": number;
        "total": number;
        "total_pages": number;
        "data": {
            "id": number;
            "first_name": string;
            "last_name": string;
            "avatar": string;
        }[];
    };
}[];
