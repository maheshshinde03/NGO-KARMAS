import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoRequestsComponent } from './ngo-requests.component';
import { ModifyNgoRequestsComponent } from './modify-ngo-requests/modify-ngo-requests.component';
import { ModifyNgoRequestsSelfComponent } from './modify-ngo-requests-self/modify-ngo-requests-self.component';

const routes: Routes = [
    {
        path: '', component: NgoRequestsComponent,
        data: {
            title: "Request List",
            breadcrumb: "Request List",
        }
    },
    {
        path: 'create', component: ModifyNgoRequestsComponent,
        data: {
            title: "Create Request",
            breadcrumb: "Create Request",
        }
    },
    {
        path: 'edit/:id', component: ModifyNgoRequestsComponent,
        data: {
            title: "Edit Request",
            breadcrumb: "Edit Request",
        }
    },
    {
        path: 'view/:id', component: ModifyNgoRequestsComponent,
        data: {
            title: "View Request",
            breadcrumb: "View Request",
        }
    },
    {
        path: 'self-create', component: ModifyNgoRequestsSelfComponent,
        data: {
            title: "Create Request",
            breadcrumb: "Create Request",
        }
    },
    {
        path: 'self-edit/:id', component: ModifyNgoRequestsSelfComponent,
        data: {
            title: "Edit Request",
            breadcrumb: "Edit Request",
        }
    },
    {
        path: 'self-view/:id', component: ModifyNgoRequestsSelfComponent,
        data: {
            title: "View Request",
            breadcrumb: "View Request",
        }
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NgoRequestsRoutingModule { }
