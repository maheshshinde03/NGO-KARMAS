import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeControllerService } from '@shared/_http/offices.service';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { FormComponent } from '@shared/component/form/form.component';
import { YES_NO_LISTDATA } from '@shared/configs/yesNoSelect-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-popup-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FormComponent],
  templateUrl: './modify-popup-form.component.html',
  styleUrl: './modify-popup-form.component.scss'
})
export class ModifyPopupFormComponent implements OnInit, AfterViewInit {
  @Output() selectValueChangeChange: EventEmitter<any> = new EventEmitter();
  subs: any;
  routeName: any;
  routeId: any;
  additionalFields:any = {
    state_name :'',
    district_name :'',
    country_name :'',
  }
  constructor(private router: Router, private activatedroute: ActivatedRoute,private toastService: ToastService,private countryservice:CountryService,private stateService:StateService,private cityService:CityService,private officeControllerService:OfficeControllerService,
    public dialogRef: MatDialogRef<ModifyPopupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.subs = new Subscription();
    // this.formSearchGroupStructure = JSON.parse(JSON.stringify(AgentMultiAddressGstSearchGroup));
    console.log('this.formSearchGroupStructure = ',this.data);
    // this.activatedroute.url.subscribe(urlSegments => {
    //   this.routeName = urlSegments[0]?.path;
    // });
    // this.activatedroute.paramMap.subscribe(params => {
    //   this.routeId = params.get('id');
    // });
    this.initialization()
  }

  ngAfterViewInit(): void {
    if (this.routeId){}

    if(this.data.formDetailsData?.data?.country_id && this.data.formDetailsData?.data?.city_id){
      this.setCityDataViaCountryId(this.data.formDetailsData?.data?.country_id);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.data.formSearchGroupStructure.forEach((ele:any) => {
      if (ele.type == 'select')
        this.setOptionValues(ele)
      if (this.routeName == 'view')
        ele.disable = true
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "country":
        this.subs.add(this.countryservice.getAllCountry().subscribe({
          next: (value) => {
            ele.listData = value.data

          }
        }))
        break
      case "state":
        this.subs.add(this.stateService.getAllState().subscribe({
          next: (value) => {
            // console.log(' value.data = ', value.data)
            ele.listData = value.data
          }
        }))
        break
      case "office_type":
        this.subs.add(this.officeControllerService.getAllOfficeType().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "yesno":
        ele.listData = YES_NO_LISTDATA.yesno
        break
    }
  }

  handleSelectValueChange(value: any): void {
    if(value.controlName === "designation_id"){
      this.additionalFields.designation_name = value.designation_name;
    }

    if(value.controlName === 'ngo_field_id'){
      this.additionalFields.field_name = value.field_name;
      this.additionalFields.ngo_type_name = value.field_name;
    }

    if(value.controlName === 'category_id'){
      this.additionalFields.category_name = value.field_name;
      // this.additionalFields.category_name = value.field_name;
    }


    if(value.controlName === 'city_id'){
      this.additionalFields.city_name = value.city_name;
    }

    if(value.controlName === 'state_id'){
      this.additionalFields.state_name = value.state_name;
    }
    if (value.controlName === 'country_id') {
      this.additionalFields.country_name = value.country_name;
      this.setCityDataViaCountryId(value.country_id);
    }
    if(value.controlName === 'district_id'){
      this.additionalFields.district_name = value.district_name;
    }
  }

  setCityDataViaCountryId(id:any){
    this.subs.add(this.cityService.getByCountryId(id).subscribe({
      next: (value) => {
        this.data.formSearchGroupStructure.forEach((elee:any) => {
          if (elee.name == 'city_id') {
            elee.listData = value.data
          }
        })
      },error: (err) => {
      }
    }))
  }

  onSave(): void {
    const result = {
      // Your data to pass back
      someProperty: 'someValue'
    };
    this.dialogRef.close(result);
  }

  // Method to close the dialog without passing any data
  onCancel(): void {
    this.dialogRef.close();
  }

  handleSubmit(event: any) {
    console.log(' this.additionalFields  = ', this.additionalFields)
    event.formValue = {...event.formValue,...this.additionalFields};
    const result = {
      // Your data to pass back
      event: event
    };
    this.dialogRef.close(result);
  }

}




