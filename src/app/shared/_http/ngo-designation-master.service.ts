import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing ngo_designation_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class NGODesignationMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all designations
   */
  getAllDesignations(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}ngo_designation_master`);
  }

  /**
   * Fetch all designations
   */
  getAllDesignationsGetByNgoId(id:any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}ngo_designation_master/getBy/NgoId?ngo_id=${id}`);
  }

  
  /**
   * Fetch a designation by ID
   * @param id designation_id
   */
  getDesignationById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}ngo_designation_master/getById?id=${id}`);
  }

  /**
   * Create a new designation
   * @param payload request payload for creation
   */
  createDesignation(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.post(`${this.baseUrl}ngo_designation_master/create`, payload);
  }

  /**
   * Update an existing designation
   * @param payload updated data
   * @param id designation_id
   */
  updateDesignation(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.put(`${this.baseUrl}ngo_designation_master/update?id=${id}`, payload);
  }

  /**
   * Delete a designation
   * @param id designation_id
   */
  deleteDesignation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}ngo_designation_master/delete?id=${id}`);
  }
}
