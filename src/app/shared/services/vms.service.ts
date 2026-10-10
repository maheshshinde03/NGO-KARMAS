import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VMSService {
  constructor(private cookieService: CookieService) {}

  setSsoCookies(username: string, accessToken: string, refreshToken: string, idToken: string, isProd: boolean) {
    const domain = isProd ? '.theballardpier.com' : '.everestek.com';
    const path = '/admin/sso';

    // Set cookies with the necessary attributes
    this.cookieService.set('sso-authentication-username', username, undefined, path, domain);
    this.cookieService.set('sso-authentication-access-token', accessToken, undefined, path, domain);
    this.cookieService.set('sso-authentication-refresh-token', refreshToken, undefined, path, domain);
    this.cookieService.set('sso-authentication-id-token', idToken, undefined, path, domain);

    // Navigate to the dev portal after setting cookies
    window.open('https://vms-dev.everestek.com/admin/sso', '_blank');
  }
}
