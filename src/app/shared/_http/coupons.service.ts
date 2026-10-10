import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

@Injectable({
  providedIn: "root"
})
export class CouponsService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetch all coupons
   */
  getAllCoupons(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}coupons`);
  }

  /**
   * Fetch a coupon by ID
   * @param id coupon_id
   */
  getCouponById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}coupons/getByid?id=${id}`);
  }

  /**
   * Create a new coupon
   * @param payload coupon payload
   */
  createCoupon(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Audit tracking
    return this.httpClient.post(`${this.baseUrl}coupons/create`, payload);
  }

  /**
   * Update an existing coupon
   * @param payload updated coupon data
   * @param id coupon_id
   */
  updateCoupon(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Audit tracking
    return this.httpClient.put(`${this.baseUrl}coupons/update?id=${id}`, payload);
  }

  /**
   * Delete a coupon
   * @param id coupon_id
   */
  deleteCoupon(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}coupons/delete?id=${id}`);
  }
}
