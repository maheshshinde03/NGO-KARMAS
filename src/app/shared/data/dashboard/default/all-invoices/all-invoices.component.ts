import { Component, Input } from '@angular/core';
import { AllInvoices, RecentRequestList } from '@shared/data/dashboard/default/default';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '@shared/directives/outside.directive';
import { Router, RouterModule } from '@angular/router';
import { currentUser } from '@shared/utils/current-user';

@Component({
  selector: 'app-all-invoices',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, RouterModule],
  templateUrl: './all-invoices.component.html',
  styleUrl: './all-invoices.component.scss'
})
export class AllInvoicesComponent {
  @Input() recentRequestAll: any;
  @Input() isNgoLogin: any;
  public InvoiceData = RecentRequestList;
  public isopen: boolean = false;
  domain = 'http://13.200.125.58:3000/';
  constructor(private router: Router) { }
  open() {
    this.isopen = !this.isopen
  }

  clickOutside(): void {
    this.isopen = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case "Request Completed":
        return "success";   // green
      case "Request Inisited":
        return "warning";   // yellow
      case "Request Rejected":
        return "danger";    // red
      default:
        return "secondary"; // gray fallback
    }
  }

  redirectToRequest(data: any) {
    if (this.isNgoLogin) {
      this.router.navigateByUrl(`/ngo-requests/view/${data.RequestId}`)
    } else {
      this.router.navigateByUrl(`/requests/edit/${data.RequestId}`)
    }
  }
}
