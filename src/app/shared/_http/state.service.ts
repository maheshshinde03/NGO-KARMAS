import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class StateService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllState(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}state_master`);
    }

    getState(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}state_master/getByid?id=${id}`);
    }

    createState(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}state_master/create`, payload);
    }

    updateState(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}state_master/update?id=${id}`, payload);
    }

    deleteState(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}state_master/delete?id=${id}`);
    }
}