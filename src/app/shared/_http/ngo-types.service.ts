import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class NGOTypesService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllNGOTypes(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type`);
    }

    getNGOTypes(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type/${id}`);
    }

    getByTypesId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type/getById?id=${id}`);
    }

    createNGOTypes(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ngo_type`, payload);
    }

    updateNGOTypes(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ngo_type/${id}`, payload);
    }

    deleteNGOTypes(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_type/${id}`);
    }
}