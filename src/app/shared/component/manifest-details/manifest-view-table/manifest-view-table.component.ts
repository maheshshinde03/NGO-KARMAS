import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrewService } from '@shared/_http/crew.service';
import { PassengersService } from '@shared/_http/passengers.service';
import { TableComponent } from '@shared/component/table/table.component';
import { CrewDetailsData } from '@shared/configs/crew-config';
import { PassengersDetailsData } from '@shared/configs/passenger-config';
import { RowData } from '@shared/models/table';
import { ExcelService } from '@shared/services/excel-export.service';
import { MappedCrew, MappedPassenger } from '@shared/models/manifest-data'
import { Subscription } from 'rxjs';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { ToastService } from '@shared/services/toast.service';
import { LoaderService } from '@shared/services/loader.service';
import { PMSControllerService } from '@shared/_http/pms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manifest-view-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  providers: [PMSControllerService],
  templateUrl: './manifest-view-table.component.html',
  styleUrl: './manifest-view-table.component.scss'
})
export class ManifestViewTableComponent {
  @Input() isPassenger = true;
  @Input() isPmsSend = false;
  @Input() voyageId: any;
  routeName: any;
  routeId: any;
  PassengersCrewDetailsData: RowData = PassengersDetailsData;
  subs: any;

  constructor(private modalService: NgbModal,private pmscontrollerservice: PMSControllerService, private loaderService: LoaderService, private toastService: ToastService, private router: Router, private activatedroute: ActivatedRoute, private passengersService: PassengersService, private excelservice: ExcelService, private crewService: CrewService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.routeName = 'create';
    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('id'))
        this.routeId = params.get('id');
    });

    if (this.isPassenger) {
      const PassengersDetailsDataModify = JSON.parse(JSON.stringify(PassengersDetailsData))
      if (this.isPmsSend) {
        PassengersDetailsDataModify.headers = PassengersDetailsDataModify.headers.filter((header: any) => header.key !== 'pob' && header.key !== 'document_type' && header.key !== 'SR.NO')
        PassengersDetailsDataModify.headers.push({ label: "PMS Upload", key: "is_pms_uploaded", type: 'convertboolean' })
        PassengersDetailsDataModify.checkboxbutton = true;
        PassengersDetailsDataModify.isCheckBox = true;
        PassengersDetailsDataModify.checkboxbuttonname = "Submit";
        PassengersDetailsDataModify.exportExcel = false;
      }
      this.PassengersCrewDetailsData = PassengersDetailsDataModify;
    } else {
      const CrewDetailsDataModify = JSON.parse(JSON.stringify(CrewDetailsData))
      if (this.isPmsSend) {
        CrewDetailsDataModify.headers = CrewDetailsDataModify.headers.filter((header: any) => header.key !== 'document_type' && header.key !== 'SR.NO')
        CrewDetailsDataModify.headers.push({ label: "PMS Upload", key: "is_pms_uploaded", type: 'convertboolean' })
        CrewDetailsDataModify.checkboxbutton = true;
        CrewDetailsDataModify.isCheckBox = true;
        CrewDetailsDataModify.checkboxbuttonname = "Submit";
        CrewDetailsDataModify.exportExcel = false;
      }
      this.PassengersCrewDetailsData = CrewDetailsDataModify;
    }
    this.initialization()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }


  initialization(): void {
    this.getAllPassengersOrCrew();
  }



  handleExportAction() {
    let mappedData;
    let FileName;
    if (this.isPassenger) {
      mappedData = this.mapPassengerData(this.PassengersCrewDetailsData.data);
      FileName = 'Passenger'
    } else {
      mappedData = this.mapCrewData(this.PassengersCrewDetailsData.data);
      FileName = 'Crew'
    }
    if (mappedData)
      this.excelservice.exportAsExcelFile(mappedData, `${FileName}_Manifest_${this.routeId}`, this.PassengersCrewDetailsData.excelKeys);
  }

  mapPassengerData(data: MappedPassenger[]): Partial<MappedPassenger>[] {
    return data.map(({ suite_no, last_name, first_name, nationality, gender, birth_date, pob, document_type, document_no, document_issue_date, document_expiry_date, visa_no, type, issue_date, expiry_date, place_of_boarding }) => ({
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
    return data.map(({ crew_code, last_name, first_name, nationality, gender, dob, position, document_type, document_no, date_of_issue, date_of_expiry, seamans_book_no, seamans_book_country, seamans_book_issue_date, seamans_book_place_of_issue, seamans_book_expiration_date }) => ({
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
    if (this.isPassenger) {
      this.subs.add(this.passengersService.getAllPassengers(this.routeId).subscribe({
        next: (value) => {
          this.PassengersCrewDetailsData.data = value.data;
        }
      }))
    } else {
      this.subs.add(this.crewService.getAllCrew(this.routeId).subscribe({
        next: (value) => {
          this.PassengersCrewDetailsData.data = value.data;
        }
      }))
    }
  }

  handleCheckBoxAction(event: any) {
    if (!event || event.length == 0) {
      this.toastService.open('Select At Least One Record', 'error');
    }
    else {
      let isImageNull = false
      for (let data of event) {
        if (!data.image_file_path) {
          isImageNull = true
          this.toastService.open(`${data.first_name} has no image uploaded.`, 'error');
          break;
        }
      }
      if (!isImageNull) {
        const formData = {
          "voyage_registration_id": this.voyageId,
          "passangerIdsList": [],
          "crewListFromFrontend": []
        }
        if (this.isPassenger) {
          formData.passangerIdsList = event.map((item: any) => item.passenger_id);
        }
        else {
          formData.crewListFromFrontend = event.map((item: any) => item.crew_id);
        }
        this.loaderService.showLoader()
        this.subs.add(this.pmscontrollerservice.sendToPMS(formData).subscribe({
          next: (value) => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
      }
    }
  }
}

