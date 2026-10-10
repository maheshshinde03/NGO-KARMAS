import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { currentUser } from "@shared/utils/current-user";
import { Observable } from 'rxjs';

export interface ScoreResponse {
    data: any; // Replace `any` with a more specific type if possible
}

@Injectable({
    providedIn: "root"
})

export class TicketMasterService {
    private baseUrl: string

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL
    }

    getAllTicket(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ticket`);
    }

    getTicket(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ticket/getByid?id=${id}`);
    }

    createTicket(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}ticket/create`, payload);
    }

    updateTicket(payload: any, id: any): Observable<any> {
        payload['modified_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}ticket/update?id=${id}`, payload);
    }

    deleteTicket(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ticket/delete?id=${id}`);
    }

    uploadTicketMedia(files: any[], reqId: number): Promise<any> {
        // Extract only actual File objects and filter invalid ones
        const validFiles: File[] = files
            .map(f => f.file ? f.file : f)  // if it's wrapped object, extract `file`
            .filter(file => file && file.type); // remove invalid files

        if (!validFiles.length) return Promise.resolve([]);

        const uploadPromises = validFiles.map((file, index) => {
            const formData = new FormData();
            formData.append('mediaFile', file);
            formData.append('ticket_id', reqId.toString());
            formData.append('sequence', (index + 1).toString());

            // Safety check: if type is missing, default to 'image'
            const mediaType = file.type.startsWith('video') ? 'video' : 'image';
            formData.append('media_type', mediaType);

            return this.httpClient
                .post(`${this.baseUrl}ticket_media/create/media`, formData)
                .toPromise();
        });

        return Promise.all(uploadPromises);
    }

    deleteTicketMedia(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}ticket_media/delete?id=${id}`);
    }

    getTicketMedia(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}ticket_media/getData/ByTicketId?ticket_id=${id}`);
    }
    
}
