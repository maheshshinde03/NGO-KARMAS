import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing bonus_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class BonusMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all bonuses
   */
  getAllBonuses(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}bonus_master`);
  }

  /**
   * Fetch a bonus by ID
   * @param id bonus_id
   */
  getBonusById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}bonus_master/getById?id=${id}`);
  }

  /**
   * Create a new bonus
   * @param payload request payload
   */
  createBonus(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Audit user
    return this.httpClient.post(`${this.baseUrl}bonus_master/create`, payload);
  }

  /**
   * Update an existing bonus
   * @param payload updated data
   * @param id bonus_id
   */
  updateBonus(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Audit user
    return this.httpClient.put(`${this.baseUrl}bonus_master/update?id=${id}`, payload);
  }

  /**
   * Delete a bonus
   * @param id bonus_id
   */
  deleteBonus(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}bonus_master/delete?id=${id}`);
  }
}
