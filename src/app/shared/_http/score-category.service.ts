import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing ScoreCategory_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class ScoreCategoryService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all ScoreCategory
   */
  getAllScoreCategory(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}score_category`);
  }

  /**
   * Fetch a ScoreCategory by ID
   * @param id ScoreCategory_id
   */
  getScoreCategoryById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}score_category/getById?id=${id}`);
  }

  /**
   * Create a new ScoreCategory
   * @param payload request payload for creation
   */
  createScoreCategory(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.post(`${this.baseUrl}score_category/create`, payload);
  }

  /**
   * Update an existing ScoreCategory
   * @param payload updated data
   * @param id ScoreCategory_id
   */
  updateScoreCategory(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Add audit user
    return this.httpClient.put(`${this.baseUrl}score_category/${id}`, payload);
  }

  /**
   * Delete a ScoreCategory
   * @param id ScoreCategory_id
   */
  deleteScoreCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}score_category/${id}`);
  }
}
