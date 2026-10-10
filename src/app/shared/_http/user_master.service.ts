import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class UserService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllUser(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}user_master`);
    }

    getNgoRequestDashboardDataGetUserCount(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getUserCount?ngo_id=${id}`);
    }

    getAllUserByNGOId(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}user_master/getData/ByNgoId?ngo_id=${currentUser().ngo_id}`);
    }


    getAllUserBlackList(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}user_blacklist`);
    }

    getUser(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}user_master/getById/?id=${id}`);
    }

    createUser(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}user_master/create`, payload);
    }

    createBlockUser(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}user_blacklist/create`, payload);
    }

    updateUser(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}user_master/update/?id=${id}`, payload);
    }

    deleteUser(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}user_master/delete?id=${id}`);
    }

    // lockUser(id: any): Observable<any> {
    //     return this.httpClient.delete(`${this.baseUrl}user_blacklist/create`);
    // }

    lockUser(id: any, payload: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}user_master/block/User?user_id=${id}`, payload);
    }

    getResendOtp(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}email_verification/resendOtp/email`, payload);
    }

    getVerifyOtp(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}email_verification/verifyOtp`, payload);
    }
}