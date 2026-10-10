import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DesignationServiceController } from '@shared/_http/designation.service';
import { DistrictService } from '@shared/_http/district.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOTypesService } from '@shared/_http/ngo-types.service';
import { StateService } from '@shared/_http/state.service';
import { FormComponent } from '@shared/component/form/form.component';
import { MatStepperComponent } from '@shared/component/mat-stepper/mat-stepper.component';
import { Step } from '@shared/component/mat-stepper/sc-header-model';
import { ModifyPopupFormComponent } from '@shared/component/popup-form/modify-popup-form/modify-popup-form.component';
import { NGODetailsData, NGOFieldMappingFormGroup, NGOFundFormGroup, NGOOfficeBearersDetailsTable, NGOOfficeBearersFormGroup, SectorsOfWorkDetailsFormGroup, NGOTypeSearchGroup, SectorOfWorkDetailsTable, NGOFundData } from '@shared/configs/ngo-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-ngo',
  templateUrl: './modify-ngo.component.html',
  styleUrl: './modify-ngo.component.scss'
})
export class ModifyNgoComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  ngoTypeSearchGroupStructure!: IFormStructure[];

  // NGO OFFICE Bearer
  ngoOfficeBearersFormGroup!: IFormStructure[]; // For Form of Office bearers
  nGOOfficeBearersDetailsTable: RowData = NGOOfficeBearersDetailsTable;   // For Table of Office bearers
  oprationMultiOfficeBearersDetails: any[] = [];  // For Operation of Office bearers

  // NGO OFFICE Bearer
  sectorsOfWorkDetailsFormGroup!: IFormStructure[];
  sectorOfWorkDetailsTable: RowData = SectorOfWorkDetailsTable;   // For Table of Sector Work Details
  oprationMultiSectorOfWorkDetails: any[] = [];  // For Operation of Sector Work Details

  // NGO Fund Details
  ngoFundDetailsTable: RowData = NGOFundData;
  ngoFundFormGroup!: IFormStructure[];
  oprationMultiNgoFundDetails: any[] = [];  // For Operation of Ngo Fund


  ngoFieldMappingFormGroup!: IFormStructure[];
  ngoDetailsData: RowData = NGODetailsData;

  ngoProfileData: any;
  jsonData: Step[] = [];

  @ViewChild(FormComponent) formComponent!: FormComponent;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private cityservice: CityService,
    private toastService: ToastService,
    private countryservice: CountryService,
    private stateservice: StateService,
    private cdr: ChangeDetectorRef,
    private ngoControllerService: NgoControllerService,
    private ngoFieldService: NGOFieldService,
    private distrctService: DistrictService,
    public dialog: MatDialog,
    private designationService: DesignationServiceController,
    private ngoTypeControllerService: NGOTypesService,
    public loader: LoaderService
  ) { }

  @ViewChild('showAlert', { static: true }) showAlert!: TemplateRef<NgbModal>;
  @ViewChild('stepperRef', { static: true }) stepperComponent!: MatStepperComponent;
  @ViewChild('ngoProfile', { static: true }) ngoProfile!: TemplateRef<any>;
  @ViewChild('ngoFund', { static: true }) ngoFund!: TemplateRef<any>;
  @ViewChild('ngoOfficeBearers', { static: true }) ngoOfficeBearers!: TemplateRef<any>;
  @ViewChild('sectorsOfWorkDetails', { static: true }) sectorsOfWorkDetails!: TemplateRef<any>;
  @ViewChild('ngoFieldMapping', { static: true }) ngoFieldMapping!: TemplateRef<any>;
  @ViewChild('preview', { static: true }) preview!: TemplateRef<any>;
  @ViewChild('parentForm') parentForm!: NgForm;

  ngOnInit(): void {
    this.subs = new Subscription()
    this.ngoTypeSearchGroupStructure = JSON.parse(JSON.stringify(NGOTypeSearchGroup));

    this.ngoFundFormGroup = JSON.parse(JSON.stringify(NGOFundFormGroup));
    this.ngoOfficeBearersFormGroup = JSON.parse(JSON.stringify(NGOOfficeBearersFormGroup));
    this.sectorsOfWorkDetailsFormGroup = JSON.parse(JSON.stringify(SectorsOfWorkDetailsFormGroup));
    this.ngoFieldMappingFormGroup = JSON.parse(JSON.stringify(NGOFieldMappingFormGroup));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initialization()
  }

  ngAfterViewInit(): void {
    this.initializeJsonData();
    if (this.routeId) {
      this.getNgoMaster();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private initializeJsonData(): void {
    this.jsonData = [
      { label: 'Profile', template: this.ngoProfile, valid: true },
      { label: 'Office Berrars List', template: this.ngoOfficeBearers, valid: true },
      { label: 'Sectors of Work Details', template: this.sectorsOfWorkDetails, valid: true },
      // { label: 'Fund List', template: this.ngoFund, valid: true },
      // { label: 'Field List', template: this.ngoFieldMapping, valid: true },
    ];

    // if (this.routeId) {
    //   this.getShipments();
    // }
  }

  initialization(): void {
    if (this.routeName === 'create') {
      this.nGOOfficeBearersDetailsTable.data = [];  // For Operation of Office bearers

      this.sectorOfWorkDetailsTable.data = [];  // For Operation of Sector Work Details
      this.ngoDetailsData.data = [];  // For Operation of Ngo Fund
    }

    const ngoId = currentUser().ngo_id;
    this.ngoTypeSearchGroupStructure.forEach((ele, index) => {
      if (ngoId) {
        if (ele.name === 'ngo_logo' || ele.name === "pan_file" || ele.name === "crs_regis_file" || ele.name === "digital_signature_file" || ele.name === "stamp_file") {
          ele.hiddenControl = true;
          this.formComponent.updateValidator(ele.name, false);
        }
      }
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })

    this.ngoFundFormGroup.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })

    this.ngoOfficeBearersFormGroup.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    });

    this.sectorsOfWorkDetailsFormGroup.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })

    this.ngoFieldMappingFormGroup.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {

      case "district":
        this.subs.add(this.distrctService.getAllDistrict().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "ngo_field":
        this.subs.add(this.ngoFieldService.getAllNGOField().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "ngo_types":
        this.subs.add(this.ngoTypeControllerService.getAllNGOTypes().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "country":
        this.subs.add(this.countryservice.getAllCountry().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "city":
        this.subs.add(this.cityservice.getAllCity().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "state":
        this.subs.add(this.stateservice.getAllState().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "designation_list":
        this.subs.add(this.designationService.getDesignationDetailsAll().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break


    }
  }

  getNgoMaster() {
    this.loader.showLoader();
    this.subs.add(this.ngoControllerService.getNgo(this.routeId).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.ngoDetailsData.data = value.data;

        if (value.data.city_of_registration_id) {
          this.ngoDetailsData.data.city_of_registration_id = Number(value.data.city_of_registration_id);
          this.ngoDetailsData.data.city_id = Number(value.data.city_id);
        }


        if (value.data?.ngo_logo_path) {
          this.ngoDetailsData.data.ngo_logo = value.data?.ngo_logo_path;
        }

        if (value.data?.pan_card_file_url) {
          this.ngoDetailsData.data.pan_file = value.data?.pan_card_file_url;
        }

        if (value.data?.crs_regis_file_path) {
          this.ngoDetailsData.data.crs_regis_file = value.data?.crs_regis_file_path;
        }

        if (value.data?.digital_signature_file_path) {
          this.ngoDetailsData.data.digital_signature_file = value.data?.digital_signature_file_path;
        }

        if (value.data?.stamp_file_path) {
          this.ngoDetailsData.data.stamp_file = value.data?.stamp_file_path;
        }

        if (value.data.unique_id) {
          this.ngoDetailsData.data.registration_type = 'Regi. with Dharpan';
        } else {
          this.ngoDetailsData.data.registration_type = 'Regi. with Non-dharpan';
        }
        this.nGOOfficeBearersDetailsTable.data = value.data.office_berears_list;
        this.nGOOfficeBearersDetailsTable.data = value.data.office_berears_list;
        this.sectorOfWorkDetailsTable.data = value.data.ngo_state_district_mapping_list;

        console.log('value = ', value);
        // this.CityDetailsData.data = value.data
      }, error: () => {
        this.loader.hideLoader();
      }
    }))
  }

  validateStep(stepIndex: number) {
    // Example logic to determine if step is valid
    const isValid = true;
    this.updateStepValidity(stepIndex, isValid);
  }


  updateStepValidity(stepIndex: number, isValid: boolean) {
    this.jsonData[stepIndex].valid = isValid;
    this.cdr.detectChanges();
  }

  handleSubmit(event: any, step: string) {
    switch (step) {
      case 'ngProfile':
        this.ngoProfileData = JSON.parse(JSON.stringify(event["formValue"]));
        this.validateStep(0);
        break;
      case 'ngoOfficeBearers':
        this.validateStep(1);
        break;
      case 'sectorsOfWorkDetails':
        // this.validateStep(2);
        this.FinalSubmit();

        break;
      case 'ngoFund':
        // this.validateStep(3);
        this.FinalSubmit();
        break;
      // case 'ngoFieldMapping':
      //   this.validateStep(4);
      //   break;
      default:
        console.log('Unknown step');
    }

    // Optionally, you can proceed to next step in stepper if needed
    this.stepperComponent.stepperNext();
    // let formData = JSON.parse(JSON.stringify(event["formValue"]))
    // switch (this.routeName) {
    //   case 'create':
    //     this.subs.add(this.cityservice.createCity(formData).subscribe({
    //       next: (value) => {
    //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
    //         this.toastService.open(message, 'success');
    //         this.router.navigateByUrl("/city")
    //       },
    //       error: (err) => {
    //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
    //         this.toastService.open(message, 'error');
    //       }
    //     }))
    //     break;
    //   case 'edit':
    //     this.subs.add(this.cityservice.updateCity(formData, this.routeId).subscribe({
    //       next: (value) => {
    //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
    //         this.toastService.open(message, 'success');
    //         this.router.navigateByUrl("/city")
    //       },
    //       error: (err) => {
    //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
    //         this.toastService.open(message, 'error');
    //       }
    //     }))
    //     break;

    // }
  }


  handleDeleteAction(event: any) {

  }

  handleCreateAction(type: string) {
    const routeForBank = 'create'
    this.opneDialogRef('create', null, type)
  }

  opneDialogRef(route: string, indexId?: any, type?: string) {
    let data;
    let configDialog: MatDialogConfig = {
      maxWidth: '80vw',
      maxHeight: '90vh',
      height: '100%',
      width: '100%',
      data: data,
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-container', // Use a custom class for additional styling
    };

    if (type === 'officeBearers') {
      data = {
        formSearchGroupStructure: this.ngoOfficeBearersFormGroup,
        formDetailsData: this.nGOOfficeBearersDetailsTable,
        title: 'OFFICE BEARESRS DETAILS',
        route: route
      };

      configDialog = {
        maxWidth: '80vw',
        maxHeight: '90vh',
        height: '100%',
        width: '100%',
        data: data,
        autoFocus: true,
        disableClose: true,
        panelClass: 'custom-dialog-container', // Use a custom class for additional styling
      }
    }
    if (type === 'sectorOfWorkDetails') {
      data = {
        formSearchGroupStructure: this.sectorsOfWorkDetailsFormGroup,
        formDetailsData: this.sectorOfWorkDetailsTable,
        title: 'Sector Of Work Details',
        route: route
      };

      configDialog = {
        maxWidth: '60vw',
        maxHeight: '50vh',
        height: '100%',
        width: '100%',
        data: data,
        autoFocus: true,
        disableClose: true,
        panelClass: 'custom-dialog-container', // Use a custom class for additional styling
      }
    }
    if (type === 'ngoFundDetails') {
      data = {
        formSearchGroupStructure: this.ngoFundFormGroup,
        formDetailsData: this.ngoFundDetailsTable,
        title: 'NGO FUND DETAILS',
        route: route
      };

      configDialog = {
        maxWidth: '80vw',
        maxHeight: '90vh',
        height: '100%',
        width: '100%',
        data: data,
        autoFocus: true,
        disableClose: true,
        panelClass: 'custom-dialog-container', // Use a custom class for additional styling
      }
    }


    // Open the dialog and capture the result
    const dialogRef = this.dialog.open(ModifyPopupFormComponent, configDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        // Process the result here
        if (result?.event && type === 'officeBearers') {
          this.setArrayOfficeBearers(result?.event, route, indexId)
          // this.submitBankdetails(result?.event,route,routeId);
        }
        if (result?.event && type === 'sectorOfWorkDetails') {
          this.setArraySectorOfWorkdetails(result?.event, route, indexId)
        }
        if (result?.event && type === 'ngoFundDetails') {
          this.setArrayNgoFunddetails(result?.event, route, indexId)
        }
      } else {
        if (type === 'officeBearers') {
          this.nGOOfficeBearersDetailsTable.data = [...this.nGOOfficeBearersDetailsTable.data, ...this.oprationMultiOfficeBearersDetails];
        }
        if (type === 'sectorOfWorkDetails') {
          this.sectorOfWorkDetailsTable.data = [...this.sectorOfWorkDetailsTable.data, ...this.oprationMultiSectorOfWorkDetails];
        }
        if (type === 'ngoFundDetails') {
          this.ngoFundDetailsTable.data = [...this.ngoFundDetailsTable.data, ...this.oprationMultiNgoFundDetails];
        }

        // if (type === 'officeBearers') {
        //   this.nGOOfficeBearersDetailsTable.data = this.oprationMultiOfficeBearersDetails;
        // }
        // if (type === 'sectorOfWorkDetails') {
        //   this.sectorOfWorkDetailsTable.data = this.oprationMultiSectorOfWorkDetails;
        // }
        // if (type === 'ngoFundDetails') {
        //   this.ngoFundDetailsTable.data = this.oprationMultiNgoFundDetails;
        // }
      }
    });
  }

  setArrayOfficeBearers(data: any, route?: string, indexId?: any) {
    let formData = JSON.parse(JSON.stringify(data["formValue"]));
    if (route === 'edit') {
      this.oprationMultiOfficeBearersDetails[indexId] = formData
    } else if (route === 'create') {
      this.oprationMultiOfficeBearersDetails.push(formData);
    }
    this.nGOOfficeBearersDetailsTable.data = [...this.nGOOfficeBearersDetailsTable.data, ...this.oprationMultiOfficeBearersDetails];
    // this.oprationMultiAddressDetail = 
    console.log('this.nGOOfficeBearersDetailsTable.data = ', this.nGOOfficeBearersDetailsTable.data);

  }

  setArraySectorOfWorkdetails(data: any, route?: string, indexId?: any) {
    let formData = JSON.parse(JSON.stringify(data["formValue"]));
    if (route === 'edit') {
      this.oprationMultiSectorOfWorkDetails[indexId] = formData
    } else if (route === 'create') {
      this.oprationMultiSectorOfWorkDetails.push(formData);
    }
    this.sectorOfWorkDetailsTable.data = [...this.sectorOfWorkDetailsTable.data, ...this.oprationMultiSectorOfWorkDetails];
    // this.oprationMultiAddressDetail = 
    console.log('this.sectorOfWorkDetailsTable.data = ', this.sectorOfWorkDetailsTable.data);

  }

  setArrayNgoFunddetails(data: any, route?: string, indexId?: any) {
    let formData = JSON.parse(JSON.stringify(data["formValue"]));
    if (route === 'edit') {
      this.oprationMultiNgoFundDetails[indexId] = formData
    } else if (route === 'create') {
      this.oprationMultiNgoFundDetails.push(formData);
    }
    this.ngoFundDetailsTable.data = [...this.ngoFundDetailsTable.data, ...this.oprationMultiNgoFundDetails];;

    // this.oprationMultiAddressDetail = 
    console.log('this.ngoFundDetailsTable.data = ', this.ngoFundDetailsTable.data);

  }

  selectValueChange(event: any) {
    if (event.controlName === 'registration_type') {
      this.ngoTypeSearchGroupStructure.forEach(ele => {
        if (event.registrationId === 2) {
          if (ele.name === 'unique_id' || ele.name === 'darpan_reg_date') {
            ele.hiddenControl = true;
            ele.required = false;

            this.formComponent.updateValidator(ele.name, false);
          }
        }

        if (event.registrationId === 1) {
          if (ele.name === 'unique_id' || ele.name === 'darpan_reg_date') {
            ele.hiddenControl = false;
            ele.required = true;

            this.formComponent.updateValidator(ele.name, true);
          }
        }
      });
    }
  }


  handleFileUpload(event: any): void {
    console.log('event. = ', event);
    // if (event?.fieldName === 'pan_file') {
    //   this.ngoDetailsData.data.pan_file = event.base64String;
    //   this.ngoDetailsData.data.pan_cad_file_name = event.imgName;
    // }
    // if (event?.fieldName === 'ngo_logo') {
    //   this.ngoDetailsData.data.ngo_logo = event.base64String;
    //   this.ngoDetailsData.data.ngo_logo_file = event.imgName;
    // }
    // if (event?.fieldName === 'crs_regis_file') {
    //   this.ngoDetailsData.data.crs_regis_file = event.base64String;
    //   this.ngoDetailsData.data.crs_regis_file_name = event.imgName;
    // }
    if (event?.fieldName === "ngo_logo") {
      this.ngoDetailsData.data.ngo_logo_file = event.base64String;
      this.ngoDetailsData.data.ngo_logo = event.imgName;
    } else if (event?.fieldName === "pan_file") {
      this.ngoDetailsData.data.pan_file = event.base64String;
      this.ngoDetailsData.data.pan_cad_file_name = event.imgName;
    } else if (event?.fieldName === "crs_regis_file") {
      this.ngoDetailsData.data.crs_regis_file = event.base64String;
      this.ngoDetailsData.data.crs_regis_file_name = event.imgName;
    } else if (event?.fieldName === "digital_signature_file") {
      this.ngoDetailsData.data.digital_signature_file = event.base64String;
      this.ngoDetailsData.data.digital_signature_file_name = event.imgName;
    } else if (event?.fieldName === "stamp_file") {
      this.ngoDetailsData.data.stamp_file = event.base64String;
      this.ngoDetailsData.data.stamp_file_name = event.imgName;
    }
  }



  FinalSubmit() {
    // this.ngoProfileData["ngoFundsList"] = this.ngoFundDetailsTable.data;
    this.ngoProfileData["ngoOfficeBearersList"] = this.nGOOfficeBearersDetailsTable.data;
    this.ngoProfileData["ngoStateDistrictCityList"] = this.sectorOfWorkDetailsTable.data;

    if (this.ngoDetailsData?.data?.ngo_logo_file && this.ngoDetailsData?.data?.ngo_logo) {
      this.ngoProfileData.ngo_logo_file = this.ngoDetailsData.data.ngo_logo_file;
      this.ngoProfileData.ngo_logo = this.ngoDetailsData.data.ngo_logo;
    }

    if (this.ngoDetailsData?.data?.pan_file && this.ngoDetailsData?.data?.pan_cad_file_name) {
      this.ngoProfileData.pan_file = this.ngoDetailsData.data.pan_file;
      this.ngoProfileData.pan_cad_file_name = this.ngoDetailsData.data.pan_cad_file_name;
    }

    if (this.ngoDetailsData?.data?.crs_regis_file && this.ngoDetailsData?.data?.crs_regis_file_name) {
      this.ngoProfileData.crs_regis_file = this.ngoDetailsData.data.crs_regis_file;
      this.ngoProfileData.crs_regis_file_name = this.ngoDetailsData.data.crs_regis_file_name;
    }

    if (this.ngoDetailsData?.data?.digital_signature_file && this.ngoDetailsData?.data?.digital_signature_file_name) {
      this.ngoProfileData.digital_signature_file = this.ngoDetailsData.data.digital_signature_file;
      this.ngoProfileData.digital_signature_file_name = this.ngoDetailsData.data.digital_signature_file_name;
    }

    if (this.ngoDetailsData?.data?.stamp_file && this.ngoDetailsData?.data?.stamp_file_name) {
      this.ngoProfileData.stamp_file = this.ngoDetailsData.data.stamp_file;
      this.ngoProfileData.stamp_file_name = this.ngoDetailsData.data.stamp_file_name;
    }


    console.log('this.ngoProfileData  = ', this.ngoProfileData);
    this.loader.showLoader();

    switch (this.routeName) {
      case 'create':
        this.subs.add(this.ngoControllerService.createNgo(this.ngoProfileData).subscribe({
          next: (value) => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/ngo")
          },
          error: (err) => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.ngoControllerService.createNgo(this.ngoProfileData).subscribe({
          next: (value) => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/ngo")
          },
          error: (err) => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;

    }
  }

}



