import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class ServiceService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllService(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-master`);
    }

    getService(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-master/${id}`);
    }

    createService(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}service-master`, payload);
    }

    updateService(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}service-master/${id}`, payload);
    }

    deleteService(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}service-master/${id}`);
    }

    getAllServiceType(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-type`);
    }

    getServiceType(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-type/${id}`);
    }

    createServiceType(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}service-type`, payload);
    }

    updateServiceType(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}service-type/${id}`, payload);
    }

    deleteServiceType(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}service-type/${id}`);
    }

    getAllServiceSubType(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-sub-type`);
    }

    getServiceSubType(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service-sub-type/${id}`);
    }

    createServiceSubType(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}service-sub-type`, payload);
    }

    updateServiceSubType(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}service-sub-type/${id}`, payload);
    }

    deleteServiceSubType(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}service-sub-type/${id}`);
    }

    getAllServiceSubTypeUnit(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service_sub_type_unit`);
    }

    getServiceSubTypeUnit(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service_sub_type_unit/${id}`);
    }

    getServiceSubTypeUnitBySubTypeID(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}service_sub_type_unit/serviceSubtypeId/${id}`);
    }

    createServiceSubTypeUnit(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}service_sub_type_unit`, payload);
    }

    updateServiceSubTypeUnit(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}service_sub_type_unit`, payload);
    }

    deleteServiceSubTypeUnit(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}service_sub_type_unit/${id}`);
    }

    getServiceSubTypeAgentContractAndSubtypeid(contract_id: any, sub_type_id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}agent_contract_details/getBy/agentContractId/serviceSubTypeId/${contract_id}?service_sub_type_id=${sub_type_id}`);
    }
}