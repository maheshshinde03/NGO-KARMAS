import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { DashboardChartComponent } from '@shared/component/dashboard-chart/dashboard-chart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { ScheduleTimeComponent } from '@shared/component/schedule-time/schedule-time.component';
import { TotalInvoiceComponent } from '@shared/component/total-invoice/total-invoice.component';
import { DashboardAllVoyageComponent } from '@shared/component/dashboard-all-voyage/dashboard-all-voyage.component';
import { LoaderService } from '@shared/services/loader.service';
import { TableComponent } from '@shared/component/table/table.component';
import { ProjectOverviewComponent } from '@shared/component/project-overview/project-overview.component';
import { DashboardService } from '@shared/_http/dashboard.service';
import { WebsocketService } from '@shared/services/websocket.service';
import { VMSService } from '@shared/services/vms.service';
import { EcommerceComponent } from '@shared/component/ecommerce/ecommerce.component';
import { TaskSummaryComponent } from '@shared/data/dashboard/default/task-summary/task-summary.component';
import { AllInvoicesComponent } from '@shared/data/dashboard/default/all-invoices/all-invoices.component';
import { TotalProjectComponent } from '@shared/data/dashboard/project/total-project/total-project.component';
import { RewardCountDashboardComponent } from '@shared/data/dashboard/default/reward-count-dashboard/reward-count-dashboard.component';
import { NotificationService } from '@shared/_http/notification.service';
import { AllNotificationsComponent } from '@shared/component/header/notification/all-notifications/all-notifications.component';

@NgModule({
  declarations: [AdminDashboardComponent, AgentDashboardComponent],
  imports: [
    CommonModule,
    EcommerceComponent,
    TaskSummaryComponent,
    TotalProjectComponent,
    AllInvoicesComponent,
    DashboardRoutingModule,
    FormComponent,
    DashboardChartComponent,
    ScheduleTimeComponent,
    TotalInvoiceComponent,
    DashboardAllVoyageComponent,
    TableComponent,
    ProjectOverviewComponent,
    AllNotificationsComponent,
    RewardCountDashboardComponent,
  ],
  providers:[DashboardService,LoaderService,WebsocketService,VMSService,NotificationService]
})
export class DashboardModule { }
