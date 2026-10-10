import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class DashboardService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getDrsDashboard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}drs_header/getDrs/dashBoard`);
    }

    getInvoiceDashboard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}invoice_master/invoice/dashBoard`);
    }

    getInvoiceDashboardAgent(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}invoice_master/invoiceDash/byAgent/${id}`);
    }

    getVoyageDashboard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}voyage_registration/operator/dashBoard`);
    }

    getVoyageDashboardAgent(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}voyage_registration/getDashBoard/ByAgent/${id}`);
    }

    getVoyageDetailsDashboardAgent(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}voyage_registration/voyage/twelve/agent/${id}`);
    }

    getAdminDashboardData(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getWeb/DashBoard`);
    }

    getAgentDashboardData(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getWeb/DashBoard`);
    }

    getAgentDashboardDataForNgo(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getWeb/DashBoard?ngo_id=${id}`);
    }

    getNgoRequestDashboardData(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests/getData/ByNgoId?ngo_id=${id}`);
    }

    getNgoRequestDashboardDataGetNgoCount(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getNgoCount?ngo_id=${id}`);
    }
    getNgoRequestDashboardDataGetRequestCount(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getRequestCount?ngo_id=${id}`);
    }
    getNgoRequestDashboardDataGetUserCount(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getUserCount?ngo_id=${id}`);
    }

     getRewardCountDashboard(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getRewardsCount`);
    }
    
}