import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { currentUser } from '@shared/utils/current-user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = currentUser();
    console.log('user = ',user);
    switch (user?.menu_id) {
      case 1:
        this.router.navigate(['dashboard/admin-dashboard']);
        break
      default:
        this.router.navigate(['dashboard/agent-dashboard']);
        break
    }
    // if (user?.role_id == 1) {
    //   this.router.navigate(['dashboard/admin-dashboard']);
    // }
    // // if (user?.role_id == 3) {
    // //   this.router.navigate(['dashboard/admin-dashboard']);
    // // } 
    // else {
    //   this.router.navigate(['dashboard/agent-dashboard']);
    // }
    return false;
  }
}
