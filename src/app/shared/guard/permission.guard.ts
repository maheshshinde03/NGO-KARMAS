import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GlobalConfig } from '@shared/configs/global-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { ToastService } from '@shared/services/toast.service';
import { EncryptedStorage } from '@shared/utils/encrypted-storage';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {

  constructor(private router: Router,private toastService:ToastService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const pages: any[] = JSON.parse(
      new EncryptedStorage().getItem(new GlobalConfig().pagePermissions) || "[]"
    );
    
    // Ensure pages is an array and filter out invalid entries
    const validPages = pages.filter((page) => page.page_url);

    // Check if the current route is in the valid pages
    const currentPageId = route.data['pageId'];
    const currentPage = validPages.find((page) => page.page_id === currentPageId);
    // alert('currentPageId = ' + currentPageId);
    // console.log('pages = ',pages);

    // console.log('validPages = ',validPages);
    // console.log('currentPageId = ',currentPageId);
    if (currentPage && currentPage.permission) {
      return true; // User has permission
    } else {
      // Redirect to a 'not authorized' page or a default route
      this.router.navigate(['/not-authorized']);
      const message = responseMessages.codes.find(item => item.code == '7.0006')?.message ?? 'Access Denied!';
      this.toastService.open(message, 'error');
      return false;
    }
  }
}
