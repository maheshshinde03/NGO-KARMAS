import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from "rxjs";

@Injectable()
export class GiftAndRewardControllerService {
    baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL;
    }

    getAllGiftAndReward(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}gift_master`);
    }

    getGiftAndReward(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}gift_master/${id}`);
    }

    createGiftAndReward(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}gift_master/create`, payload);
    }

    updateGiftAndReward(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}gift_master/update?id=${id}`, payload);
    }

    deleteGiftAndReward(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}Ngo/${id}`);
    }
}