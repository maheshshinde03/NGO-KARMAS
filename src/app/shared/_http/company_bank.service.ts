import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class CompanyBankService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllBank(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}company_bank_details`);
    }
    getAllBankbyCompany(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}company_bank_details/getBankDetail/byCompany/${id}`);
        // http://localhost:8082/api/v1/company_bank_details/getBankDetail/byCompany/2
    }

    getBankDetailsId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}company_bank_details/${id}`);
    }

    createBankDetails(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}company_bank_details`, payload);
    }

    updateBankDetails(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}company_bank_details/${id}`, payload);
    }

    deleteCompany(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}company_bank_details/${id}`);
    }
}