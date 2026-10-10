import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class NotificationService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllNotification(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}notification_details/getData/userId/${currentUser().user_id}?is_read=null`);
    }

    getAllUnreadNotification(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}notification_details/getData/userId/${currentUser().user_id}?is_read=0`);
    }

    getAllUnreadNGONotification(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}notification_history/get/Notification?user_id=${currentUser().user_id}`);
    }

    

    getAllReadNotification(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}notification_details/getData/userId/${currentUser().user_id}?is_read=0`);
    }

    readNotificationByID(id:number,payload:any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}notification_details/${id}`,payload);
    }

    readAllNotification(): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}notification_details/update/readByUser/${currentUser().user_id}`,{});
    }
}