import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})

export class RequestsService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllrequests(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests`);
    }

    getAllrequestsForNGO(ngo_id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_ngo/getData/ByFilter/Ngo?ngo_id=${ngo_id}`);
    }

    getAllrequestsForNGO_ORG(ngo_id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests/getBy/NgoCreatedId?id=${ngo_id}`);
    }

    getAllrequestsForNGOGetByUserId(user_id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}request_ngo/getBy/UserId?user_id=${user_id}`);
    }

    getNgoRequestDashboardDataGetRequestCount(id?: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}dashboard/getRequestCount?ngo_id=${id}`);
    }

    getrequests(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests/getById/${id}`);
    }

    getByRequestId(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}requests/getById/?id=${id}`);
    }

    createrequests(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}requests/create`, payload);
    }

    updaterequests(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}requests/update/?id=${id}`, payload);
    }

    deleterequests(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}requests/delete?id=${id}`);
    }

    approveAndRejectRequests(reqNgoId: any, payload: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}request_ngo/update/ngo/status?Request_Ngo_Id=${reqNgoId}`, payload);
    }


    requestForDocuments(reqNgoId: any, payload: any): Observable<any> {
        return this.httpClient.put(`${this.baseUrl}request_ngo/sendNotification/document?Request_Ngo_Id=${reqNgoId}`, payload);
    }

    uploadRequestMedia(files: any[], reqId: number): Promise<any> {
        // Extract only actual File objects and filter invalid ones
        const validFiles: File[] = files
            .map(f => f.file ? f.file : f)  // if it's wrapped object, extract `file`
            .filter(file => file && file.type); // remove invalid files

        if (!validFiles.length) return Promise.resolve([]);

        const uploadPromises = validFiles.map((file, index) => {
            const formData = new FormData();
            formData.append('mediaFile', file);
            formData.append('RequestId', reqId.toString());
            formData.append('sequence', (index + 1).toString());

            // Safety check: if type is missing, default to 'image'
            const mediaType = file.type.startsWith('video') ? 'video' : 'image';
            formData.append('media_type', mediaType);

            return this.httpClient
                .post(`${this.baseUrl}request_media/RequestPost/Media`, formData)
                .toPromise();
        });

        return Promise.all(uploadPromises);
    }

    deleteRequestsMedia(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}request_media/delete?id=${id}`);
    }

    ngoRequestDocumentCategory(payload: any) {
        return this.httpClient.post(`${this.baseUrl}ngo_request_document_category/create`, payload);
    }

    updateNgoRequestDocumentCategory(payload: any, id: any) {
        return this.httpClient.put(`${this.baseUrl}ngo_request_document_category/update?id=${id}`, payload);
    }

    ngoRequestDocumentCategoryGetId(id: any) {
        return this.httpClient.get(`${this.baseUrl}ngo_request_document_category/getBy/ngoId?id=${id}`);
    }

    requestDocumentById(id: any) {
        return this.httpClient.get(`${this.baseUrl}request_documents/getDocument/ByRequestId?RequestId=${id}`);
    }

}