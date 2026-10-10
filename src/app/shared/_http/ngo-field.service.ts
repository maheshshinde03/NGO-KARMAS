import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class NGOFieldService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllNGOField(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_fields`);
    }

    getNGOField(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_fields/${id}`);
    }

    getByNgoFieldId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_fields/getById?id=${id}`);
    }

    createNGOField(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ngo_fields/create`, payload);
    }

    updateNGOField(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ngo_fields/update?id=${id}`, payload);
    }

    deleteNGOField(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_fields/delete?id=${id}`);
    }
}