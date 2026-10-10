import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.API_BASE_URL;
  }

  getAllPages(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}pages`);
  }

  createPages(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id
    return this.httpClient.post(`${this.baseUrl}pages`, payload);
  }

  getPage(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}pages/${id}`);
  }

  updatePage(payload: any, id: any): Observable<any> {
    payload['modified_by'] = currentUser().user_id
    return this.httpClient.put(`${this.baseUrl}pages/${id}`, payload);
  }

}
