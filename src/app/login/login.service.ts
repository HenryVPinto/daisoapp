import { Global } from '../utils/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(
        private _http: HttpClient,
    ) { }

    public login(username, password) {
        const url = `${Global.BASE_API_URL}/security/login`;
        const headers = new HttpHeaders({
            'username': username,
            'password': password,
        });

        return this._http.post(
            url,
            {},
            { headers: headers }
        );
    }

}
