import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing designation_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class DesignationMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all designations
   */
  getAllDesignations(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}designation_master`);
  }

  /**
   * Fetch a designation by ID
   * @param id designation_id
   */
  getDesignationById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}designation_master/getById?id=${id}`);
  }

  /**
   * Create a new designation
   * @param payload request payload for creation
   */
  createDesignation(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.post(`${this.baseUrl}designation_master/create`, payload);
  }

  /**
   * Update an existing designation
   * @param payload updated data
   * @param id designation_id
   */
  updateDesignation(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.put(`${this.baseUrl}designation_master/update?id=${id}`, payload);
  }

  /**
   * Delete a designation
   * @param id designation_id
   */
  deleteDesignation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}designation_master/delete?id=${id}`);
  }
}
