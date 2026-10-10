import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftCompanyMasterService } from '@shared/_http/gift-company-master.service';
import { GiftCompanyMasterDetailsData } from '@shared/configs/company-gift-master-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-company-master',
  templateUrl: './gift-company-master.component.html',
  styleUrl: './gift-company-master.component.scss'
})
export class GiftCompanyMasterComponent {

companyMasterDetailsData: RowData = GiftCompanyMasterDetailsData;
subs: Subscription = new Subscription();

constructor(private router: Router, private companyService: GiftCompanyMasterService) {}

ngOnInit(): void {
  this.getAllCompanies();
}

ngOnDestroy(): void {
  this.subs.unsubscribe();
}

getAllCompanies() {
  this.subs.add(
    this.companyService.getAllCompanies().subscribe({
      next: (value) => {
        this.companyMasterDetailsData.data = value.data;
      }
    })
  );
}

handleCreateAction() {
  this.router.navigateByUrl("/gift-company-master/create");
}

handleDeleteAction(event: any) {
  this.subs.add(
    this.companyService.deleteCompany(event).subscribe({
      next: () => this.getAllCompanies()
    })
  );
}

handleEditAction(event: any) {
  this.router.navigateByUrl(`/gift-company-master/edit/${event}`);
}

handleViewAction(event: any) {
  this.router.navigateByUrl(`/gift-company-master/view/${event}`);
}
}