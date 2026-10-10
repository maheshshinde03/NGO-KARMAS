import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private allowedRoutes: Set<string> = new Set();
  private isGuardInitialized = false; // Flag to ensure routes are initialized only once
  private readonly defaultRoute = '/'; // Default route if the path is not allowed

  constructor(private router: Router, private toastr: ToastService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Initialize routes if not already done
    if (!this.isGuardInitialized) {
      await this.initializeAllowedRoutes();
      console.log('initializeAllowedRoutes');
    }

    const currentRoute = state.url;
    // console.log('Attempting to access route:', currentRoute);
    // console.log('Allowed routes:', Array.from(this.allowedRoutes));

    // // Check if the route is known
    // if (!this.isRouteAvailable(currentRoute)) {
    //   console.log('Route is not available:', currentRoute);
    //   this.toastr.open('The route you are trying to access does not exist.', 'error');
    //   this.router.navigate([this.defaultRoute]); // Redirect to a default route
    //   return false;
    // }

    // Check if the route is allowed
    const isAllowed = this.isRouteAllowed(currentRoute);
    if (isAllowed) {
    //   console.log('Route is allowed.');
      return true;
    } else {
    //   console.log('Access denied for route:', currentRoute);
      // this.toastr.open('Access denied. You are not authorized to access this route.', 'error');
      // this.router.navigate([this.defaultRoute]); // Redirect to a default route
      // return false;
      return true;
    }
  }

  private async initializeAllowedRoutes(): Promise<void> {
    try {
      const menuData = currentUser().menu;
      if (menuData) {
        const menu = typeof menuData === 'string' ? JSON.parse(menuData) : menuData;
        this.allowedRoutes = this.extractRoutesFromMenu(menu);
        this.isGuardInitialized = true; // Mark as initialized
      } else {
        console.warn('No menu data available');
        this.toastr.open('No menu data available.', 'warning');
      }
    } catch (error) {
      console.error('Failed to parse menu data:', error);
      this.toastr.open('Failed to parse menu data.', 'error');
      // Optionally, navigate to a fallback route or handle as needed
    }
  }

  private isRouteAvailable(route: string): boolean {
    const cleanedRoute = route.trim();
    return this.allowedRoutes.has(cleanedRoute);
  }

  private isRouteAllowed(route: string): boolean {
    const cleanedRoute = route.trim();
    return this.allowedRoutes.has(cleanedRoute);
  }

  private extractRoutesFromMenu(menu: any[]): Set<string> {
    const routes: string[] = [];
    const menuData = currentUser().menu;
    if (menuData?.role_id == 1) {
        routes.push('dashboard/admin-dashboard')
    } else {
        routes.push('dashboard/agent-dashboard')
    }
    this.extractRoutes(menu, routes);
    return new Set(routes);
  }

  private extractRoutes(menu: any[], routes: string[]): void {
    menu.forEach(item => {
      if (item.type === 'link' && item.path) {
        routes.push(item.path);
      }
      if (item.children) {
        this.extractRoutes(item.children, routes);
      }
    });
  }

  resetGuard() {
    this.isGuardInitialized = false; // Reset guard initialization flag
  }
}
