import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private baseUrl: string = `${environment.API_BASE_URL}district`;
  private districtCache$: Observable<any> | null = null;
  constructor(private http: HttpClient) {}

  // Get list of districts (for search)
  getDistricts(forceRefresh = false): Observable<any> {
     if (!forceRefresh && this.districtCache$) {
      return this.districtCache$;
    }
    this.districtCache$ = this.http
      .get(`${this.baseUrl}`)
      .pipe(shareReplay(1));

    return this.districtCache$;

  }

  // Get district by ID (for view/edit)
  getDistrictById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getById?districtId=${id}`);
  }

  // Create new district
  createDistrict(district: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, district);
  }

  // Update existing district
  updateDistrict(district: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update?districtId=${id}`, district);
  }

  // Delete district
  deleteDistrict(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
