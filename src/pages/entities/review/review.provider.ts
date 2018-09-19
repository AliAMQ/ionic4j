import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { Review } from './review.model';

@Injectable()
export class ReviewService {
    private resourceUrl = Api.API_URL + '/reviews';

    constructor(private http: HttpClient) { }

    create(review: Review): Observable<Review> {
        return this.http.post(this.resourceUrl, review);
    }

    update(review: Review): Observable<Review> {
        return this.http.put(this.resourceUrl, review);
    }

    find(id: number): Observable<Review> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
