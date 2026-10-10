import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class EmployeeControllerService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllEmployee(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}employee`);
    }

    getEmployee(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}employee/${id}`);
    }

    createEmployee(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}employee`, payload);
    }

    updateEmployee(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}employee/${id}`, payload);
    }

    deleteEmployee(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}employee/${id}`);
    }
}