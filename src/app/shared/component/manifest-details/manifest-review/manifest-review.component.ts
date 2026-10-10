import { Component, Input } from '@angular/core';
import { AllInvoices } from '../../../../shared/data/dashboard/default/default';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { Subscription } from 'rxjs';
import { PassengersService } from '@shared/_http/passengers.service';
import { ExcelService } from '@shared/services/excel-export.service';
import { CrewService } from '@shared/_http/crew.service';
import { MappedCrew, MappedPassenger } from '@shared/models/manifest-data';
import { PassengersDetailsData } from '@shared/configs/passenger-config';
import { CrewDetailsData } from '@shared/configs/crew-config';

@Component({
  selector: 'app-manifest-review',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective,RouterModule,FeathericonComponent,FeathericonComponent],
  templateUrl: './manifest-review.component.html',
  styleUrl: './manifest-review.component.scss'
})
export class ManifestReviewComponent {
  @Input() passengerDetails:any;
  @Input() isPassenger = true;
  public InvoiceData = AllInvoices;
  public isopen:boolean = false;

  routeName: any;
  routeId:any;
  subs: any;
  PassengersCrewDetailsExcelKey:any
  
  constructor(private router: Router,private activatedroute: ActivatedRoute, private passengersService: PassengersService,private excelservice:ExcelService,private crewService:CrewService) { }
  ngOnInit(): void {
    this.subs = new Subscription()
    this.routeName = 'create';
    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('id'))
        this.routeId = params.get('id');
    });

    if(this.isPassenger){
      this.PassengersCrewDetailsExcelKey = PassengersDetailsData
    }else{
      this.PassengersCrewDetailsExcelKey = CrewDetailsData
    }

  }

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }

  downloadExcel(data:any){
    console.log(data)
    if(this.isPassenger){
      this.subs.add(this.passengersService.getAllPassengersByStatus(data.statusId,this.routeId).subscribe({
        next: (value) => {
          this.handleExportAction(value.data,data?.statusShow)
        }
      }))
    }else{
      this.subs.add(this.crewService.getAllCrewByStatus(data.statusId,this.routeId).subscribe({
        next: (value) => {
          this.handleExportAction(value.data,data?.statusShow)
        }
      }))
    }
  }

  handleExportAction(data:any,status:any) {
    let mappedData;
    let FileName;
      if(this.isPassenger){
        mappedData = this.mapPassengerData(data);  
        FileName='Passenger'
      }else{
        mappedData = this.mapCrewData(data);
        FileName='Crew'  
      }
      if(mappedData)   
        this.excelservice.exportAsExcelFile(mappedData, `${FileName}_Manifest(${status})_${this.routeId}`, this.PassengersCrewDetailsExcelKey.excelKeys);
  }

  mapPassengerData(data: MappedPassenger[]): Partial<MappedPassenger>[] {
    return data.map(({ suite_no, last_name, first_name, nationality, gender, birth_date, pob, document_type,document_no, document_issue_date, document_expiry_date, visa_no, type, issue_date, expiry_date, place_of_boarding }) => ({
      suite_no,
      last_name,
      first_name,
      nationality,
      gender,
      birth_date,
      pob,
      document_type,
      document_no,
      document_issue_date,
      document_expiry_date,
      visa_no,
      type,
      issue_date,
      expiry_date,
      place_of_boarding
    }));
  }

  mapCrewData(data: MappedCrew[]): Partial<MappedCrew>[] {
    return data.map(({ crew_code, last_name, first_name, nationality, gender, dob, position, document_type,document_no,date_of_issue, date_of_expiry,seamans_book_no,seamans_book_country,seamans_book_issue_date,seamans_book_place_of_issue,seamans_book_expiration_date}) => ({
      crew_code,
      last_name,
      first_name,
      nationality,
      gender,
      dob,
      position,
      document_type,
      document_no,
      date_of_issue,
      date_of_expiry,
      seamans_book_no,
      seamans_book_country,
      seamans_book_issue_date,
      seamans_book_place_of_issue,
      seamans_book_expiration_date
    }));
  }

  getAllPassengersOrCrew() {
    // if(this.isPassenger){
    //   this.subs.add(this.passengersService.getAllPassengers(this.routeId).subscribe({
    //     next: (value) => {
    //       this.PassengersCrewDetailsData.data = value.data;
    //     }
    //   }))
    // }else{
    //   this.subs.add(this.crewService.getAllCrew(this.routeId).subscribe({
    //     next: (value) => {
    //       this.PassengersCrewDetailsData.data = value.data;
    //     }
    //   }))
    // }

  }

}
