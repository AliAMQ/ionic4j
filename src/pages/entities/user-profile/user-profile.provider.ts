import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {
    private resourceUrl = Api.API_URL + '/user-profiles';

    constructor(private http: HttpClient) { }

    create(userProfile: UserProfile): Observable<UserProfile> {
        return this.http.post(this.resourceUrl, userProfile);
    }

    update(userProfile: UserProfile): Observable<UserProfile> {
        return this.http.put(this.resourceUrl, userProfile);
    }

    find(id: number): Observable<UserProfile> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
