import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GiftMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL from environment

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all gifts
   */
  getAllGifts(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}gift_master`);
  }

  /**
   * Fetch gift by ID
   * @param id Gift Master ID
   */
  getGiftById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}gift_master/getById?id=${id}`);
  }

  /**
   * Create a new gift
   * @param payload gift payload to save
   */
  createGift(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Audit tracking
    return this.httpClient.post(`${this.baseUrl}gift_master/create`, payload);
  }

  /**
   * Update existing gift
   * @param payload updated payload
   * @param id Gift Master ID
   */
  updateGift(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Audit tracking
    return this.httpClient.put(`${this.baseUrl}gift_master/update?id=${id}`, payload);
  }

  /**
   * Delete gift by ID
   * @param id Gift Master ID
   */
  deleteGift(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}gift_master/delete?id=${id}`);
  }
}
