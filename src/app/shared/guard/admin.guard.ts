
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { GlobalConfig } from '@shared/configs/global-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  public url: any;
  constructor(public router: Router) { }
  ngOnInit() {
    this.url = this.router.url;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    let user = localStorage.getItem(new GlobalConfig().authToken) || '{}';
    if (!user || user === null) {
      this.router.navigate(['/auth/login']);
      return true;
    }
    else if (user) {
      if (!Object.keys(user).length) {
        this.router.navigate(['/auth/login']);
        return true;
      }
    }
    return true;
  }

}
