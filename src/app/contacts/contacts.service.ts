import { Global } from '../utils/global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactsService {

    constructor(
        private _http: HttpClient,
        private storage: SessionStorageService
    ) { }

    public list() {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Contact/view`;
        const headers = new HttpHeaders({
            'token': token,
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }

    public create(contact) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Contact/create`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.post(
            url,
            [contact],
            { headers: headers }
        );
    }

    public edit(contact) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Contact/edit/${contact.id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        delete contact.id;
        return this._http.put(
            url,
            contact,
            { headers: headers }
        );
    }

    public delete(id) {
        const token = this.storage.retrieve('token');
        const url = `${Global.BASE_API_URL}/Contact/delete/${id}`;
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
        const url = `${Global.BASE_API_URL}/Contact/view/${id}`;
        const headers = new HttpHeaders({
            'token': token
        });

        return this._http.get(
            url,
            { headers: headers }
        );
    }
}
