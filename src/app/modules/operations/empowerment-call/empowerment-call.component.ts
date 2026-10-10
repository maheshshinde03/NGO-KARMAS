import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { RequestsDetailsData } from '@shared/configs/requests-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empowerment-call',
  templateUrl: './empowerment-call.component.html',
  styleUrl: './empowerment-call.component.scss'
})
export class EmpowermentCallComponent {
  requestDetailsData: RowData = RequestsDetailsData;
  subs: any;

  constructor(private router: Router, private cityservice: CityService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllCity();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllCity() {
    this.subs.add(this.cityservice.getAllCity().subscribe({
      next: (value) => {
        this.requestDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/requests/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.cityservice.deleteCity(event).subscribe({
      next: (value) => {
        this.getAllCity()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/requests/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/requests/view/${event}`)
  }
}
