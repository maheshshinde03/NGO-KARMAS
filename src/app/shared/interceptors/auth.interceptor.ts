import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpEvent,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from "@angular/common/http";
import { BehaviorSubject, EMPTY, Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { EncryptedStorage } from "@shared/utils/encrypted-storage";
import { GlobalConfig } from "@shared/configs/global-config";
import { EncryptionAPILayer } from "@shared/utils/encryption-api";
import { responseMessages } from "@shared/constants/response-msgs.constant";
import { ToastService } from "@shared/services/toast.service";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastService: ToastService) { }

    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!(httpRequest.url).includes("../assets/i18n/")) {
            const Authorization = new EncryptedStorage().findItemFromAllStorage(
                new GlobalConfig().authToken
            );
            const oldRequestBody = httpRequest.body;
            // const newRequestBody = {
            //     reqBody: new EncryptionAPILayer().encryptData(httpRequest.body)
            // }
            const newRequestBody = httpRequest.body
            if (Authorization) {
                httpRequest = httpRequest.clone({ setHeaders: { 'x-access-token': Authorization }, body: newRequestBody });
                return next.handle(httpRequest).pipe(
                    catchError((err) => {
                        // const newRes = new EncryptionAPILayer().decryptData(err.error.resBody)
                        let newRes: any = {};

                        // ✅ SAFELY extract backend error
                        try {
                            if (err?.error?.resBody) {
                                newRes = typeof err.error.resBody === 'string'
                                    ? JSON.parse(err.error.resBody)
                                    : err.error.resBody;
                            } else if (err?.error) {
                                newRes = typeof err.error === 'string'
                                    ? JSON.parse(err.error)
                                    : err.error;
                            }
                        } catch (e) {
                            console.error('Error parsing error response', e);
                            newRes = { error_message: 'Something went wrong' };
                        }
                        // return new Observable<HttpEvent<any>>();
                        return throwError(newRes);
                    }),
                    map(response => {
                        if (response instanceof HttpResponse) {
                            // const newRes = new EncryptionAPILayer().decryptData(response.body.resBody)
                            const newRes = response.body;
                            if (newRes.code && !newRes.success) {
                                const message = responseMessages.codes.find(item => item.code == newRes.code)?.message;
                                if (message)
                                    this.toastService.open(message, 'error');
                                else
                                    this.toastService.open('Something went wrong, please try again later', 'error');
                            }
                            response = response.clone({ body: newRes })
                            return response
                        }
                        return response;
                    })
                );
                // return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
            } else {
                httpRequest = httpRequest.clone({ body: newRequestBody });
                return next.handle(httpRequest).pipe(
                    catchError((err) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401 || err.status === 403) {
                                this.unauthorizedUserLogin();
                            }
                            if (err.status === 404) {
                                this.toastService.open('Not found', 'info');
                            }

                        }
                        return throwError(err);
                        // return new Observable<HttpEvent<any>>();
                    }),
                    map(response => {
                        if (response instanceof HttpResponse) {
                            // const newRes = new EncryptionAPILayer().decryptData(response.body.resBody)
                            const newRes = response.body
                            response = response.clone({ body: newRes })
                            if (newRes.code && !newRes.success) {
                                const message = responseMessages.codes.find(item => item.code == newRes.code)?.message;
                                if (message)
                                    this.toastService.open(message, 'error');
                                else
                                    this.toastService.open('Something went wrong, please try again later', 'error');
                            }
                            return response
                        }
                        return response;
                    })
                );
            }
        }
        else {
            return next.handle(httpRequest);
        }
    }

    timeoutSessionLogoutUser() {
        this.toastService.open('Your session is about to expire.', 'info');
        new EncryptedStorage().clearAll();
        this.router.navigate([new GlobalConfig().loginRoute]).then(() => {
            window.location.reload();
        });
    }

    unauthorizedUserLogin() {
        this.toastService.open('Unauthorized! Please Check your credentials or Contact System Admin.', 'info');
        new EncryptedStorage().clearAll();
        this.router.navigate([new GlobalConfig().loginRoute]).then(() => {
            // window.location.reload();
        });
    }

    throwGatewayError() {
        this.toastService.open('API Gateway Error', 'info');
    }
}
