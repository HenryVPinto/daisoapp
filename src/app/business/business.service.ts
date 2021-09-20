import { Global } from '../utils/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BussinesService {

    constructor(
        private _http: HttpClient,
        private storage: SessionStorageService
    ) { }

    public list() {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Account/view`;
        const headers = new HttpHeaders({
            'token': token,
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }

    public create(account) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Account/create`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.post(
            url,
            [account],
            { headers: headers }
        );
    }

    public edit(account) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Account/edit/${account.id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        delete account.id;
        return this._http.put(
            url,
            account,
            { headers: headers }
        );
    }

    public delete(id) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Account/delete/${id}`;
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
        const url = `${Global.BASE_API_URL}/Account/view/${id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }
}
