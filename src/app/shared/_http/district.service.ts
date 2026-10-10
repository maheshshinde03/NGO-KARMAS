import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class DistrictService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllDistrict(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}district`);
    }

    getDistrict(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}district/getByid?id=${id}`);
    }

    createDistrict(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}district/create`, payload);
    }

    updateDistrict(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}district/update?id=${id}`, payload);
    }

    deleteDistrict(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}district/delete?id=${id}`);
    }
}