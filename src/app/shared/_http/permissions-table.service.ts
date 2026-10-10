import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { GlobalConfig } from "@shared/configs/global-config";
import { currentUser } from "@shared/utils/current-user";
import { EncryptedStorage } from "@shared/utils/encrypted-storage";
import { Observable, of } from "rxjs";

@Injectable()
export class PermissionPageTableControllerService {
    baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL;
    }

    getAllPermissions(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}permission/getAll`);
    }

    getAllPages(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page/`);
    }

    getAllPagePermission(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getAll`);
    }

    getAllPageByID(pageid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page/getPageById?page_id=${pageid}`);
    }

    getAllPagePermissionByID(pagepermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getById?page_permission_id=${pagepermissionid}`);
    }

    getAllPagePermissionByPageId(PageId: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getData/byPageId?page_id=${PageId}`);
    }

    getAllPermissionsByID(permissionId: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}permission/getById?permissionId=${permissionId}`);
    }

    getAllRoleByID(roleid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}role/get/role/byId?role_id=${roleid}`);
    }

    getAllRole(): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
        });
        return this.httpClient.get(`${this.baseUrl}role/getAll/roleByView`,{headers});
    }

    getAllRolePermissions(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}group_role_page_permission/getAll/Data`);
    }

    getAllRolePermissionsID(rolepagepermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}group_role_page_permission/getBy/idView?role_page_permission_id=${rolepagepermissionid}`);
    }

    deleteRoleById(roleid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}role/delete/roleBySp?role_id=${roleid}`);
    }

    deletePageById(pageId: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}page/delete?pageId=${pageId}`);
    }

    deletePagePermissionById(pagePermissionId: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}page_permission/delete?id=${pagePermissionId}`);
    }

    deletePermissionsById(permissionid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}permission/delete?permission_id=${permissionid}`);
    }

    deleteRolePermissionById(rolepagepermissionid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}group_role_page_permission/delete/bySp?role_page_permission_id=${rolepagepermissionid}`);
    }

    createRole(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}role/create/bySp`, payload);
    }

    createPage(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}page/create`, payload);
    }

    createPagePermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}page_permission/create`, payload);
    }

    createUpdatePagePermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}page_permission/bulkCreate/update`, payload);
    }

    createPermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}permission/create`, payload);
    }

    createRolepermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.post(`${this.baseUrl}group_role_page_permission/create/groupRolePage`, payload);
    }

    updateRole(payload: any, roleid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}role/update/rolebySp?role_id=${roleid}`, payload);
    }

    updatePage(payload: any, pageid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}page/update?page_id=${pageid}`, payload);
    }

    updatePagePermission(payload: any, pagePermissionId: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}page_permission/update?pagePermissionId=${pagePermissionId}`, payload);
    }

    updatePermission(payload: any, permissionid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}permission/update?permission_id=${permissionid}`, payload);
    }

    updateRolepermission(payload: any, rolepagepermissionid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}group_role_page_permission/update/bySp?role_page_permission_id=${rolepagepermissionid}`, payload);
    }

    getAllPagePermissionForTable(): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
            });
        return this.httpClient.get(`${this.baseUrl}page_permission/getAll`,{headers});
    }

    getAllPageRolePermisisonByID(id:any): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
        });
        return this.httpClient.get(`${this.baseUrl}group_role_page_permission/get/DataByRole/Id?role_id=${id}`,{headers});
    }

    createPermissionForUser(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id
        return this.httpClient.put(`${this.baseUrl}group_customer_page_permission/create/update/Data`, payload);
    }

    getuserPermissionByID(id:any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}group_customer_page_permission/getData/ByUserId?user_id=${id}`);
    }
}