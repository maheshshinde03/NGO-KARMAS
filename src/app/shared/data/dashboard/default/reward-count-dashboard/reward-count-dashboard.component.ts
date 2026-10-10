import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ClickOutsideDirective } from '@shared/directives/outside.directive';
import { RecentRequestList } from '../default';

@Component({
  selector: 'app-reward-count-dashboard',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, RouterModule],
  templateUrl: './reward-count-dashboard.component.html',
  styleUrl: './reward-count-dashboard.component.scss'
})
export class RewardCountDashboardComponent {
  @Input() rewardCountDash: any;
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
