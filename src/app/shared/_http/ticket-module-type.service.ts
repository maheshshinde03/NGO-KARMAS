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

export class TicketModuleTypeMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllTicketModuleType(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ticket_moodule_type`);
    }

    getTicketModuleType(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ticket_moodule_type/getByid?id=${id}`);
    }

    createTicketModuleType(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ticket_moodule_type/create`, payload);
    }

    updateTicketModuleType(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ticket_moodule_type/update?id=${id}`, payload);
    }

    deleteTicketModuleType(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ticket_moodule_type/delete?id=${id}`);
    }
}