import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class CityService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllCity(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}city`);
    }

    getCity(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}city/getByid?id=${id}`);
    }

    getByCountryId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}city/byCountry/${id}`);
    }

    createCity(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}city/create`, payload);
    }

    updateCity(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}city/update?id=${id}`, payload);
    }

    deleteCity(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}city/delete?id=${id}`);
    }
}