import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";
import { currentShip } from "@shared/utils/current-ship";

@Injectable({
  providedIn: 'root'
})
export class UploadControllerService {

    baseUrl: string;

    constructor(private httpClient: HttpClient) {
      this.baseUrl = `${environment.API_BASE_URL}`;
    }


    uploadFile(formData: FormData): Observable<any> {
        // Simulating a delay and then returning a mock response
        return new Observable(observer => {
          setTimeout(() => {
            const imageUrl = `https://dummyimage.com/600x400/000/fff&text=Uploaded+Image`;
            observer.next({ data: { imageUrl } });
            observer.complete();
          }, 1000); // Simulating a delay of 1 second
        });
      }

    // postData(data: any,type?:string): Observable<any> {
    //   let payload = {
    //     excelFile : data,
    //     voyage_registration_id : currentShip().voyage_registration_id
    //   }
    //   console.log('payload = ',payload);
    //   return this.httpClient.post<any>(`${this.baseUrl}`, payload);
    // }

    // getAllPassengers(): Observable<any> {
    //   return this.httpClient.get(this.baseUrl);
    // }

    // getAllPassengersCount(): Observable<any> {
    //   const id = currentShip().voyage_registration_id;
    //   console.log('currentShip() = ',currentShip());
    //   return this.httpClient.get(`${this.baseUrl}passenger-count/${id}`);
    // }

    // createPassenger(payload: any): Observable<any> {
    //   payload['created_by'] = currentUser().user_id;
    //   const id = currentShip().voyage_registration_id
    //   return this.httpClient.post(`${this.baseUrl}${id}`, payload);
    // }

    // uploadPassenger(payload: any): Observable<any> {
    //   payload['created_by'] = currentUser().user_id;
    //   const id = currentShip().voyage_registration_id
    //   return this.httpClient.post(this.baseUrl, payload);
    // }

    // updatePassenger(payload: any, id: any): Observable<any> {
    //   payload['modified_by'] = currentUser().user_id;
    //   return this.httpClient.put(`${this.baseUrl}${id}`, payload);
    // }
}
