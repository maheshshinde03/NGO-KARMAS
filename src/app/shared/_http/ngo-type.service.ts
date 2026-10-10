import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class NgoTypeService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllNgoTypeId(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type`);
    }

    getNgoTypeId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type/${id}`);
    }

    getByNgoTypeId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_type/getById?id=${id}`);
    }

    createNgoType(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ngo_type/create`, payload);
    }

    updateNgoTypeId(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ngo_type/update?id=${id}`, payload);
    }

    deleteNgoTypeId(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_type/delete?id=${id}`);
    }
}