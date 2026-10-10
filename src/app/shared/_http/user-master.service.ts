import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserMasterControllerService {
  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.API_BASE_URL}user_master`;
  }
  
  // GET ALL
  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
  //Create User
  createUser(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id;
    return this.httpClient.post(`${this.baseUrl}`, payload);
  }
  //Update User
  updateUser(payload: any, id: any): Observable<any> {
    payload['modified_by'] = currentUser().user_id;     
    return this.httpClient.put(`${this.baseUrl}/${id}`, payload);
  }

  //GET By User Id
  getByUserId(id:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // Delete by User Id
  deleteUsers(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  //---------- For Agent ----------------->
  getAllCustomer(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
  getAgentsByVoyageId(id:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  getMasterByAgentId(id:number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/agent/${id}`);
  }

  createAgentUser(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id;
    payload['role_id'] = 2;
    payload['status_id'] = 1;
     
    return this.httpClient.post(`${this.baseUrl}`, payload);
  }
  updateAgentUser(payload: any, id: any): Observable<any> {
    payload['modified_by'] = currentUser().user_id;
    payload['role_id'] = 2;
    payload['status_id'] = 1;
     
    return this.httpClient.put(`${this.baseUrl}/${id}`, payload);
  }

  checkEmailDuplicateForAgent(payload:any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/emailId/duplicate`,payload);
  }
}
