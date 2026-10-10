import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GiftCompanyMasterService {
  private baseUrl = environment.API_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}company_master`);
  }

  getCompanyById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}company_master/getById?id=${id}`);
  }

  createCompany(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id;
    return this.httpClient.post(`${this.baseUrl}company_master/create`, payload);
  }

  updateCompany(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id;
    return this.httpClient.put(`${this.baseUrl}company_master/update?id=${id}`, payload);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}company_master/delete?id=${id}`);
  }
}
