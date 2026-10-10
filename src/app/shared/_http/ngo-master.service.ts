import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from "rxjs";

@Injectable()
export class NgoControllerService {
    baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL;
    }

    getAllNgo(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_master`);
    }

    getAllNgoBlackList(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_master/getBlackist/getAll`);
    }

    getNgoRequestDashboardDataGetNgoCount(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getNgoCount?ngo_id=${id}`);
    }

    getAllNgoRequestWise(requestId: number): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests/getNgo/DataByRequest?RequestId=${requestId}`);
    }

    getAllDocumentsRequestWise(requestId: number): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_documents/getDocument/ByRequestId?RequestId=${requestId}`);
    }

    assignNgoToRequest(payload: any): Observable<any> {
        // payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}request_ngo/create/update/requestNgo`, payload);
    }

    getNgo(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_master/getNgo/Databy?ngo_id=${id}`);
    }

    createNgo(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        payload['is_active'] = true;
        payload['status_id'] = 2;
        return this.httpClient.post(`${this.baseUrl}ngo_master/create/update`, payload);
    }

    updateNgo(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ngo_master/update?id=${id}`, payload);
    }

    deleteNgo(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_master/delete?id=${id}`);
    }

    deleteOfficeBearier(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_office_bearers/delete?id=${id}`);
    }

    deleteSectorWorkDetails(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_state_district_mapping/delete?id=${id}`);
    }

    uploadNgoMedia(files: any[], ngoId: number): Promise<any> {
        // Extract only actual File objects and filter invalid ones
        const validFiles: File[] = files
            .map(f => f.file ? f.file : f)  // if it's wrapped object, extract `file`
            .filter(file => file && file.type); // remove invalid files

        if (!validFiles.length) return Promise.resolve([]);

        const uploadPromises = validFiles.map((file, index) => {
            const formData = new FormData();
            formData.append('mediaFile', file);
            formData.append('ngo_id', ngoId.toString());
            formData.append('sequence', (index + 1).toString());

            // Safety check: if type is missing, default to 'image'
            const mediaType = file.type.startsWith('video') ? 'video' : 'image';
            formData.append('media_type', mediaType);

            return this.httpClient
                .post(`${this.baseUrl}ngo_media/create/media`, formData)
                .toPromise();
        });

        return Promise.all(uploadPromises);
    }


    blockNgo(payload: any): Observable<any> {
        // return this.httpClient.put(`${this.baseUrl}user_master/block/User?user_id=${id}`, payload);
        return this.httpClient.put(`${this.baseUrl}ngo_master/blacklist/Ngo`, payload);
    }


    blockNgoById(payload: any): Observable<any> {
        // return this.httpClient.put(`${this.baseUrl}user_master/block/User?user_id=${id}`, payload);
        return this.httpClient.put(`${this.baseUrl}ngo_master/blacklist/Ngo?ngo_id=${payload.ngo_id}`, payload);
    }
    getAllRegisterNgoList(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_registration`);
    }

    registerNgo(payload: any): Observable<any> {
        // payload['created_by'] = currentUser().user_id;
        // payload['is_active'] = true;
        // payload['status_id'] = 2;
        return this.httpClient.post(`${this.baseUrl}ngo_registration/create`, payload);
    }

    getRegisterNgoById(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_registration/getById?id=${id}`);
    }

    getRegisterNgoByEmailId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ngo_registration/getByEmail?email_id=${id}`);
    }

    updateRegisterNgo(payload: any, regId: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}ngo_registration/update?id=${regId}`, payload);
    }

    deleteRegisterNgo(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_registration/delete?id=${id}`);
    }

    updateRegisterNgoStatus(payload: any, regId: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}ngo_registration/update/status?ngo_registration_id=${regId}`, payload);
    }

    deleteNgoMedia(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ngo_media/delete?id=${id}`);
    }
}