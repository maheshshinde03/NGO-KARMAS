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

export class ScoreBoardMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllScoreBoard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}score_history`);
    }

    getscoreByParent(id:number){
        return this.httpClient.get<ScoreResponse>(`${this.baseUrl}score_history/parentId/${id}`);
    }

    getScoreBoard(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}score_history/${id}`);
    }

    createScoreBoard(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}score_history`, payload);
    }

    updateScoreBoard(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}score_history/${id}`, payload);
    }

    deleteScoreBoard(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}score_history/${id}`);
    }

    updatejobScoreBoard(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}agent_job_header/updatescore/${id}`,payload);
    }

    updatedrsScoreBoard(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}drs_header/updatescore/${id}`,payload);
    }

    updatePaymentScoreBoard(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}agent_payment/update/ScoreBoard/${id}`,payload);
    }

    updateVoyageScoreBoard(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}voyage_registration/updatescore/${id}`,payload);
    }

    updateInvoiceScoreBoard(payload: any,id: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}invoice_master/update/ScoreBoard/invoice/${id}`,payload);
    }
}