import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class KycTypeService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = `${environment.API_BASE_URL}kyc_type`
    }

    getAllKycType(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}`);
    }

    getKycType(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/${id}`);
    }

    createKycType(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}`, payload);
    }

    updateKycType(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}/${id}`, payload);
    }

    deleteKycType(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}/${id}`);
    }
}