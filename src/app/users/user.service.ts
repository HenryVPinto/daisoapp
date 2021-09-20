import { Global } from '../utils/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    constructor(
        private _http: HttpClient,
        private storage: SessionStorageService
    ) { }

    public list() {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/User/view`;
        const headers = new HttpHeaders({
            'token': token,
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }

    public create(user) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/User/create`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.post(
            url,
            [user],
            { headers: headers }
        );
    }

    public edit(user) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/User/edit/${user.id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        delete user.id;
        return this._http.put(
            url,
            user,
            { headers: headers }
        );
    }

    public delete(id) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/User/delete/${id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.delete(
            url,
            { headers: headers }
        );
    }

    public get(id) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/User/view/${id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }
}
