import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class ReportTypeMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllReportMaster(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}report_type`);
    }

    getReportMaster(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}report_type/getByid?id=${id}`);
    }

    createReportMaster(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}report_type/create`, payload);
    }

    updateReportMaster(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}report_type/update?id=${id}`, payload);
    }

    deleteReportMaster(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}report_type/delete?id=${id}`);
    }
}