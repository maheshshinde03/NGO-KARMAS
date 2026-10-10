import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class QuotesMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllQuotesMaster(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}quotes`);
    }

    getQuotesMaster(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}quotes/getByid?id=${id}`);
    }

    createQuotesMaster(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}quotes/create`, payload);
    }

    updateQuotesMaster(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}quotes/update?id=${id}`, payload);
    }

    deleteQuotesMaster(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}quotes/delete?id=${id}`);
    }
}