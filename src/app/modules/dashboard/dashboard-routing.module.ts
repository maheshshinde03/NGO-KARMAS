import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { RoleGuard } from '@shared/guard/role.guard';
import { PermissionGuard } from '@shared/guard/permission.guard';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: AgentDashboardComponent, canActivate: [RoleGuard] },
    { path: 'admin-dashboard',data: {pageId: 2}, component: AdminDashboardComponent },
    { path: 'agent-dashboard',data: {pageId: 3}, component: AgentDashboardComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
