import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing table_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class TableMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all Table
   */
  getAllTable(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}table_master`);
  }

  /**
   * Fetch a Table by ID
   * @param id Table_id
   */
  getTableById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}table_master/${id}`);
  }

  /**
   * Create a new Table
   * @param payload request payload for creation
   */
  createTable(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.post(`${this.baseUrl}table_master`, payload);
  }

  /**
   * Update an existing Table
   * @param payload updated data
   * @param id Table_id
   */
  updateTable(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.put(`${this.baseUrl}table_master/${id}`, payload);
  }

  /**
   * Delete a Table
   * @param id Table_id
   */
  deleteTable(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}table_master/${id}`);
  }
}
