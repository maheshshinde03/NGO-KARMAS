import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.API_BASE_URL}`;
  }

  getAllInvoices(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoices`);
  }

  createInvoice(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id;
    return this.httpClient.post(`${this.baseUrl}invoices`, payload);
  }

  updateInvoice(payload: any, id: any): Observable<any> {
    payload['modified_by'] = currentUser().user_id;
    return this.httpClient.put(`${this.baseUrl}invoices${id}`, payload);
  }

  getPerformaByAgentID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoice_master/performa/${id}`);
  }

  getInvoiceBYVoyageID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoice_master/voyageId/${id}`);
  }

  getPerformaByInvoiceID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoice_master/performa/byInvoice/${id}`);
  }

  getTaxableByInvoiceID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoice_master/tax/byInvoice/${id}`);
  }

  getTaxableByAgentID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}invoice_master/tax/${id}`);
  }

  sendInvoiceMail(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id;
    return this.httpClient.post(`${this.baseUrl}invoice_master/send/finalInvoice/mail`, payload);
  }
}
