// role.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { currentUser } from '@shared/utils/current-user';

@Injectable({
    providedIn: 'root'
})
export class DesignationServiceController {

    baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL;
    }

    getDesignationDetailsAll(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}designation_master/getOffice/berearslist`);
    }

    createDesignation(payload: any): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}designation_master/create`, payload);
    }

    updateDesignation(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}designation_master/update/data/${id}`, payload);
    }

}
