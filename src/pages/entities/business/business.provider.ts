import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Business } from './business.model';

@Injectable()
export class BusinessService {
    private resourceUrl = Api.API_URL + '/businesses';

    constructor(private http: HttpClient) { }

    create(business: Business): Observable<Business> {
        return this.http.post(this.resourceUrl, business);
    }

    update(business: Business): Observable<Business> {
        return this.http.put(this.resourceUrl, business);
    }

    find(id: number): Observable<Business> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
