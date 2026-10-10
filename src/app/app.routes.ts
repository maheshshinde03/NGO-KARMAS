import { Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes';
import { FullComponent } from './shared/component/layout/full/full.component';
import { fullRoutes } from './shared/routes/full-routes';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { ErrorPage1Component } from '@shared/component/error-page-1/error-page-1.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NgoRegistrationComponent } from './auth/ngo-registration/ngo-registration.component';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/forgot-password',
        component: ForgetPasswordComponent
    },
    {
        path: 'auth/reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'auth/ngo-register',
        component: NgoRegistrationComponent
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContentComponent,
        children: dashData,
        canActivate: [AdminGuard],
    },
    {
        path: '',
        component: FullComponent,
        children: fullRoutes,
    },
    {
        path: '**', // Wildcard route for a 404 page
        component: ErrorPage1Component
    }
];
