import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

/**
 * Service for managing User Activity data.
 */
@Injectable({
  providedIn: "root"
})
export class UserActivityService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Fetch all user activity records
   * @returns Observable with user activity data
   */
  getAllUserActivities(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}user_activity`);
  }
}
