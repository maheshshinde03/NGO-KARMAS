import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { GlobalConfig } from "@shared/configs/global-config";
import { PermissionsResponse } from "@shared/models/page-permission.model";
import { currentUser } from "@shared/utils/current-user";
import { EncryptedStorage } from "@shared/utils/encrypted-storage";
import { EncryptionAPILayer } from "@shared/utils/encryption-api";
import { Observable } from "rxjs";

@Injectable()
export class DesignationPermissionControllerService {
    baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.API_BASE_URL;
    }

    // --------------------------------------
    // GET APIs: Fetch all records by modules
    // --------------------------------------

    getAllPermissions(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}permission`);
    }

    getAllPages(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page/`);
    }

    getAllPagePermission(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission`);
    }

    getAllRole(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}role_master`);
    }

    getAllDesignationMaster(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}designation_group_page_permission`);
    }

    getAllDesignationByNgoId(ngoId:any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}designation_group_page_permission/get/byNgoId/Id?ngo_id=${ngoId}`);
    }

    

    // --------------------------------------
    // GET APIs: Fetch single or filtered records by ID
    // --------------------------------------

    getAllPageByID(pageid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page/getById?id=${pageid}`);
    }

    getAllPagePermissionByID(pagepermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getById?page_permission_id=${pagepermissionid}`);
    }

    getAllPagePermissionByPageId(PageId: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getData/byPageId?page_id=${PageId}`);
    }

    getAllPermissionsByID(permissionId: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}permission/getById?id=${permissionId}`);
    }

    getAllRoleByID(roleid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}role_master/getById?id=${roleid}`);
    }

    getAllRolePermissionsID(rolepagepermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}group_role_page_permission/getById?id=${rolepagepermissionid}`);
    }

    getGroupRolePermissionByRoleId(roleId: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}group_role_page_permission/get/DataByRole/Id?role_id=${roleId}`);
    }

    // --------------------------------------
    // DELETE APIs
    // --------------------------------------

    deleteRoleById(roleid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}role_master/delete?id=${roleid}`);
    }

    deletePageById(pageId: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}page/delete?id=${pageId}`);
    }

    deletePagePermissionById(pagePermissionId: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}page_permission/delete?id=${pagePermissionId}`);
    }

    deletePermissionsById(permissionid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}permission/delete?id=${permissionid}`);
    }

    deleteRolePermissionById(rolepagepermissionid: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}group_role_page_permission/delete?id=${rolepagepermissionid}`);
    }

    // --------------------------------------
    // POST APIs: Create entities
    // --------------------------------------

    createRole(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}role_master/create`, payload);
    }

    createPage(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}page/create`, payload);
    }

    createPagePermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}page_permission/create`, payload);
    }

    createUpdatePagePermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}page_permission/bulkCreate/update`, payload);
    }

    createPermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}permission/create`, payload);
    }

    createRolepermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}group_role_page_permission/create`, payload);
    }

    createDesignationPermission(payload: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.post(`${this.baseUrl}designation_group_page_permission/create`, payload);
    }

    getDesignationPermissionID(designationIdpermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}designation_group_page_permission/getById?id=${designationIdpermissionid}`);
    }

    getDesignationPermissionIDForLogin(designationIdpermissionid: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}designation_group_page_permission/get/DataBydesigantion/Id?ngo_designation_id=${designationIdpermissionid}`);
    }

    deleteDesignationPermissionById(designationId: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl}designation_group_page_permission/delete?id=${designationId}`);
    }


    // --------------------------------------
    // PUT APIs: Update existing entities
    // --------------------------------------

    updateRole(payload: any, roleid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}role_master/update?id=${roleid}`, payload);
    }

    updatePage(payload: any, pageid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}page/update?id=${pageid}`, payload);
    }

    updatePagePermission(payload: any, pagePermissionId: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}page_permission/update?pagePermissionId=${pagePermissionId}`, payload);
    }

    updatePermission(payload: any, permissionid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}permission/update?id=${permissionid}`, payload);
    }

    updateRolepermission(payload: any, rolepagepermissionid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}group_role_page_permission/update?id=${rolepagepermissionid}`, payload);
    }

    updateDesignationPermission(payload: any, rolepagepermissionid: any): Observable<any> {
        payload['created_by'] = currentUser().user_id;
        return this.httpClient.put(`${this.baseUrl}designation_group_page_permission/update?id=${rolepagepermissionid}`, payload);
    }



    // --------------------------------------
    // Secured APIs: Encrypted table permission operations
    // --------------------------------------

    /**
     * Create role-permission mapping with encrypted payload and token header
     */
    createRolepermissionForTable(payload: any): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
        });

        payload['created_by'] = currentUser().user_id;
        const newRes = new EncryptionAPILayer().encryptData(payload);
        const data = { reqBody: newRes };

        return this.httpClient.post(`${this.baseUrl}group_role_page_permission/create`, data, { headers });
    }

    /**
     * Update role-permission mapping with encrypted payload and token header
     */
    updateRolepermissionForTable(payload: any, rolepagepermissionid: any): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
        });

        payload['created_by'] = currentUser().user_id;
        const newRes = new EncryptionAPILayer().encryptData(payload);
        const data = { reqBody: newRes };

        return this.httpClient.put(`${this.baseUrl}group_role_page_permission/update?id=${rolepagepermissionid}`, data, { headers });
    }

    /**
     * Get all page-permission mappings using secure token header
     */
    getAllPagePermissionForTable(): Observable<any> {
        const Authorization = new EncryptedStorage().findItemFromAllStorage(
            new GlobalConfig().authToken
        );
        const headers = new HttpHeaders({
            'x-access-token': Authorization ? Authorization : ''
        });
        return this.httpClient.get(`${this.baseUrl}page_permission/getAll`, { headers });
    }

    /**
     * Public access (non-authenticated) version of getAllPagePermission
     */
    getAllPagePermissionForTableUser(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}page_permission/getAll`);
    }
}
