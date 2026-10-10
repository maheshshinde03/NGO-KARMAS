import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class CountryService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllCountry(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}country_master`);
    }

    getCountry(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}country_master/getByid?id=${id}`);
    }

    createCountry(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}country_master/create`, payload);
    }

    updateCountry(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}country_master/update?id=${id}`, payload);
    }

    deleteCountry(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}country_master/delete?id=${id}`);
    }
}