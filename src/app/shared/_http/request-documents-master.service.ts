import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class RequestDocumentsMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllRequestDocumentsMaster(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_document_types`);
    }

    getRequestDocumentsMaster(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_document_types/getById?id=${id}`);
    }

    createRequestDocumentsMaster(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}request_document_types`, payload);
    }

    updateRequestDocumentsMaster(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}request_document_types/update?id=${id}`, payload);
    }

    deleteRequestDocumentsMaster(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}request_document_types/delete?id=${id}`);
    }
}