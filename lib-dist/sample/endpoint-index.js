import { users } from './data';
import { RequestMethod } from '@angular/http';
export var endPointIndex = [
    {
        'name': 'GET users Response',
        'method': RequestMethod.Get,
        'regex': /.*\/api\/users/,
        'value': users
    }
];
//# sourceMappingURL=endpoint-index.js.map