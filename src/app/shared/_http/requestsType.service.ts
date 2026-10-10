import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class RequestsTypeService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllrequests(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_type`);
    }

    getrequests(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_type/getById/${id}`);
    }

    getByRequestId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_type/getById/?id=${id}`);
    }

    createrequests(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}request_type/create`, payload);
    }

    updaterequests(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}request_type/update/?id=${id}`, payload);
    }

    deleterequests(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}request_type/${id}`);
    }
}