import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

export interface ScoreResponse {
    data: any; // Replace `any` with a more specific type if possible
}

@Injectable({
    providedIn: "root"
})

export class ScoreMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllScoreBoard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}score_history`);
    }
    getAllScoreBoardDashboard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}score_history/get/dashBoard`);
    }
    
    getAllScoreHistory(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}score_history`);
    }

    getAllScoreSetting(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ScoreSetting_master`);
    }

    getscoreByParent(id:number){
        return this.httpClient.get<ScoreResponse>(`${this.baseUrl}ScoreSetting_master/parentId/${id}`);
    }

    getScoreSetting(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ScoreSetting_master/${id}`);
    }

    createScoreSetting(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ScoreSetting_master`, payload);
    }

    updateScoreSetting(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ScoreSetting_master/${id}`, payload);
    }

    deleteScoreSetting(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ScoreSetting_master/${id}`);
    }

    updatejobScoreSetting(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}agent_job_header/updatescore/${id}`,payload);
    }

    updatedrsScoreSetting(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}drs_header/updatescore/${id}`,payload);
    }

    updatePaymentScoreSetting(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}agent_payment/update/ScoreSetting/${id}`,payload);
    }

    updateVoyageScoreSetting(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}voyage_registration/updatescore/${id}`,payload);
    }

    updateInvoiceScoreSetting(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}invoice_master/update/ScoreSetting/invoice/${id}`,payload);
    }
}