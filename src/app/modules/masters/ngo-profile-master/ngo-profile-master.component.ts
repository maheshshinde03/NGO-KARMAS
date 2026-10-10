import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DesignationServiceController } from '@shared/_http/designation.service';
import { DistrictService } from '@shared/_http/district.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOTypesService } from '@shared/_http/ngo-types.service';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';
import { RequestsService } from '@shared/_http/requests.service';
import { StateService } from '@shared/_http/state.service';
import { UserService } from '@shared/_http/user_master.service';
import { FormComponent } from '@shared/component/form/form.component';
import { MatStepperComponent } from '@shared/component/mat-stepper/mat-stepper.component';
import { Step } from '@shared/component/mat-stepper/sc-header-model';
import { ModifyPopupFormComponent } from '@shared/component/popup-form/modify-popup-form/modify-popup-form.component';
import { PopupFormComponent } from '@shared/component/popup-form/popup-form.component';
import { NGOOfficeBearersDetailsTable, SectorOfWorkDetailsTable, NGOFundData, NGODetailsData, NGOTypeSearchGroup, NGOFundFormGroup, NGOOfficeBearersFormGroup, SectorsOfWorkDetailsFormGroup, NGOFieldMappingFormGroup, NGOTypeSearchGroupForProfile } from '@shared/configs/ngo-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { forkJoin, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-profile-master',
  standalone: true,
  imports: [CommonModule, FormComponent, PopupFormComponent, MatStepperComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './ngo-profile-master.component.html',
  styleUrl: './ngo-profile-master.component.scss',
  providers: [CityService, CountryService, StateService, NgoControllerService, NGOFieldService, DistrictService, DesignationServiceController, NGOTypesService, UserService, RequestDocumentsMasterService, RequestsService]
})
export class NgoProfileMasterComponent implements OnInit, AfterViewInit {

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

  tabs = [
    { label: 'NGO Profile', key: 'ngoProfile' },
    { label: 'NGO Media', key: 'ngoMedia' },
    { label: 'Documents Assign', key: 'requestDocuments' },
    // Add more as needed
  ];

  selectedTab = 0;
  formDataWhileCreating: any;
  @ViewChild(FormComponent) formComponent!: FormComponent;

  public active = 1;
  // public Quickdata = fileData.Quickdata;
  Quickdata = [
    { icon: 'fa-image', iconColor: 'info', folderName: 'Images', media_type: 'image' },
    { icon: 'fa-video', iconColor: 'danger', folderName: 'Videos', media_type: 'video' },
    // { icon: 'fa-music', iconColor: 'warning', folderName: 'Audio', media_type: 'audio' },
    // { icon: 'fa-file', iconColor: 'secondary', folderName: 'Documents', media_type: 'document' }
  ];

  selectedType: string = '';
  showModal = false;

  ngoMediaData = [
    // Replace this with backend response.data.ngo_media
  ];

  @ViewChild('uploadModal') uploadModal: any;
  @ViewChild('previewModal') previewModal: any;

  ngoId = null; // ✅ You already have this
  mediaList: any[] = [];
  filteredMedia: any[] = [];
  selectedMediaType: string = 'image';
  selectedMedia: any = null;
  isUploading = false;
  filesToUpload: any[] = [];
  mediaTypes = ['image', 'video', 'audio', 'document'];

  isDragOver = false;


  requestDocumentForm!: FormGroup;

  categoryList: any[] = [];
  documentTypeList: any[] = [];
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
    public loader: LoaderService,
    private modalService: NgbModal,
    private http: HttpClient,
    private userService: UserService,
    private fb: FormBuilder,
    private requestsService: RequestsService,
    private requestDocMasterController: RequestDocumentsMasterService,
  ) { }

  @ViewChild('showAlert', { static: true }) showAlert!: TemplateRef<NgbModal>;
  @ViewChild('stepperRef', { static: false }) stepperComponent!: MatStepperComponent;
  @ViewChild('ngoProfile', { static: true }) ngoProfile!: TemplateRef<any>;
  @ViewChild('ngoFund', { static: true }) ngoFund!: TemplateRef<any>;
  @ViewChild('ngoOfficeBearers', { static: true }) ngoOfficeBearers!: TemplateRef<any>;
  @ViewChild('sectorsOfWorkDetails', { static: true }) sectorsOfWorkDetails!: TemplateRef<any>;
  @ViewChild('ngoFieldMapping', { static: true }) ngoFieldMapping!: TemplateRef<any>;
  @ViewChild('preview', { static: true }) preview!: TemplateRef<any>;
  @ViewChild('parentForm') parentForm!: NgForm;

  ngOnInit(): void {
    this.ngoId = currentUser().ngo_id
    this.subs = new Subscription()
    this.ngoTypeSearchGroupStructure = JSON.parse(JSON.stringify(NGOTypeSearchGroupForProfile));

    this.ngoFundFormGroup = JSON.parse(JSON.stringify(NGOFundFormGroup));
    this.ngoOfficeBearersFormGroup = JSON.parse(JSON.stringify(NGOOfficeBearersFormGroup));
    this.sectorsOfWorkDetailsFormGroup = JSON.parse(JSON.stringify(SectorsOfWorkDetailsFormGroup));
    this.ngoFieldMappingFormGroup = JSON.parse(JSON.stringify(NGOFieldMappingFormGroup));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    // this.activatedroute.paramMap.subscribe(params => {
    //   this.routeId = params.get('id');
    // });
    this.routeId = currentUser().ngo_id;
    this.initialization()
  }

  ngAfterViewInit(): void {
    this.initializeJsonData();
    if (this.routeId) {
      this.getNgoMaster();
      this.getDocumentsDataById();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private initializeJsonData(): void {
    this.requestDocumentForm = this.fb.group({
      documents: this.fb.array([this.createRow()])
    });
    this.getDocumentTypeList();
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
    const fileFields = [
      'ngo_logo',
      'pan_file',
      'crs_regis_file',
      'digital_signature_file',
      'stamp_file',
      'password'
    ];
    this.ngoTypeSearchGroupStructure.forEach((ele, index) => {

      if (this.routeName == 'edit') {
        if (ele.name == 'password') {
          ele.required = false;
          ele.hiddenControl = true;
          this.formComponent.updateValidator(ele.name, false);
        }
      }

      if (ngoId && fileFields.includes(ele.name)) {
        console.log('Hiding field: ', ele.name); // <== check this in console
        ele.hiddenControl = true;
        // this.formComponent.updateValidator(ele.name, false);
      }
      if (this.routeName == 'view') {
        ele.disable = true
        if (ele.name == 'password') {
          ele.required = false;
          ele.hiddenControl = true;
          this.formComponent.updateValidator(ele.name, false);
        }


      }
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
        if (this.ngoDetailsData.data?.ngo_media) {
          this.mediaList = this.ngoDetailsData.data.ngo_media;
          this.filterByType(this.selectedMediaType);
        }
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


  handleDeleteAction(type: string, event: any) {
    console.log('type = ', type);
    console.log('event = ', event);
    if (type === 'officeBearers') {
      const index = event?.index;
      const rowData = this.nGOOfficeBearersDetailsTable.data[index];

      // Safety check
      if (index === undefined || !rowData) {
        return;
      }

      if (rowData?.bearer_id) {
        this.subs.add(this.ngoControllerService.deleteOfficeBearier(rowData?.bearer_id).subscribe({
          next: (value) => {
            this.nGOOfficeBearersDetailsTable.data.splice(index, 1);

            // Trigger Angular change detection
            this.nGOOfficeBearersDetailsTable.data = [
              ...this.nGOOfficeBearersDetailsTable.data
            ];
          }
        }))
      }

      // ✅ Remove ONLY newly added row (bearer_id == null)
      if (rowData?.bearer_id == null) {
        this.nGOOfficeBearersDetailsTable.data.splice(index, 1);

        // Trigger Angular change detection
        this.nGOOfficeBearersDetailsTable.data = [
          ...this.nGOOfficeBearersDetailsTable.data
        ];
      }
    } else if (type === 'sectorOfWorkDetails') {
      const index = event?.index;
      const rowData = this.sectorOfWorkDetailsTable.data[index];

      // Safety check
      if (index === undefined || !rowData) {
        return;
      }

      if (rowData?.ngo_state_district_mapping_id) {
        this.subs.add(this.ngoControllerService.deleteSectorWorkDetails(rowData?.ngo_state_district_mapping_id).subscribe({
          next: (value) => {
            this.sectorOfWorkDetailsTable.data.splice(index, 1);

            // Trigger Angular change detection
            this.sectorOfWorkDetailsTable.data = [
              ...this.sectorOfWorkDetailsTable.data
            ];
          }
        }))
      }

      // ✅ Remove ONLY newly added row (ngo_state_district_mapping_id == null)
      if (rowData?.ngo_state_district_mapping_id == null) {
        this.sectorOfWorkDetailsTable.data.splice(index, 1);

        // Trigger Angular change detection
        this.sectorOfWorkDetailsTable.data = [
          ...this.sectorOfWorkDetailsTable.data
        ];
      }
    }
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
        // if (type === 'officeBearers') {
        //   this.nGOOfficeBearersDetailsTable.data = [...this.nGOOfficeBearersDetailsTable.data, ...this.oprationMultiOfficeBearersDetails];
        // }
        // if (type === 'sectorOfWorkDetails') {
        //   this.sectorOfWorkDetailsTable.data = [...this.sectorOfWorkDetailsTable.data, ...this.oprationMultiSectorOfWorkDetails];
        // }
        // if (type === 'ngoFundDetails') {
        //   this.ngoFundDetailsTable.data = [...this.ngoFundDetailsTable.data, ...this.oprationMultiNgoFundDetails];
        // }

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
    // this.nGOOfficeBearersDetailsTable.data = [...this.nGOOfficeBearersDetailsTable.data, ...this.oprationMultiOfficeBearersDetails];
    this.nGOOfficeBearersDetailsTable.data.push(formData);
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
    // this.sectorOfWorkDetailsTable.data = [...this.sectorOfWorkDetailsTable.data, ...this.oprationMultiSectorOfWorkDetails];
    this.sectorOfWorkDetailsTable.data.push(formData);
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
    // Ensure object exists
    if (!this.ngoProfileData["ngoOfficeBearersList"]) {
      this.ngoProfileData["ngoOfficeBearersList"] = {};
    }
    if (!this.ngoProfileData["ngoStateDistrictCityList"]) {
      this.ngoProfileData["ngoStateDistrictCityList"] = {};
    }
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
    this.subs.add(this.ngoControllerService.createNgo(this.ngoProfileData).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
        this.toastService.open(message, 'success');
        this.router.navigateByUrl("/")
      },
      error: (err) => {
        this.loader.hideLoader();
        const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
        this.toastService.open(message, 'error');
      }
    }))
  }

  filterMedia(type: string) {
    this.selectedMediaType = type.toLowerCase();
    if (type.toLowerCase() === 'videos') {
      this.filteredMedia = this.ngoDetailsData.data.ngo_media.filter((m: any) => m.media_type === 'video');
    } else if (type.toLowerCase() === 'music') {
      this.filteredMedia = this.ngoDetailsData.data.ngo_media.filter((m: any) => m.media_type === 'audio');
    } else if (type.toLowerCase() === 'images' || type.toLowerCase() === 'document') {
      this.filteredMedia = this.ngoDetailsData.data.ngo_media.filter((m: any) => m.media_type === 'image');
    } else {
      this.filteredMedia = [];
    }
  }

  // openModal(media: any) {
  //   this.selectedMedia = media;
  //   this.modalService.open(this.mediaModal, { centered: true, size: 'lg' });
  // }

  // closeModal() {
  //   this.showModal = false;
  //   this.selectedMedia = null;
  // }

  filterByType(type: string) {
    this.selectedMediaType = type;
    this.filteredMedia = this.mediaList.filter((m) => m.media_type === type);
  }

  openUploadModal() {
    this.modalService.open(this.uploadModal, { size: 'lg', centered: true });
  }

  openPreviewModal(media: any) {
    this.selectedMedia = media;
    this.modalService.open(this.previewModal, { size: 'lg', centered: true });
  }

  // onFileChange(event: any) {
  //   this.filesToUpload = Array.from(event.target.files);
  // }

  uploadMedia() {
    if (!this.filesToUpload?.length) {
      this.toastService.open('Please select at least one file to upload.', 'warning');
      return;
    }

    this.isUploading = true;

    const token = localStorage.getItem('token') || ''; // or get it from AuthService

    this.ngoControllerService.uploadNgoMedia(this.filesToUpload, this.routeId)
      .then(() => {
        this.isUploading = false;
        this.toastService.open('Media uploaded successfully!', 'success');
        this.modalService.dismissAll();
        this.filesToUpload = []
        this.getNgoMaster(); // refresh NGO details
      })
      .catch((error) => {
        console.error('Upload failed:', error);
        this.toastService.open('Failed to upload media. Please try again.', 'error');
        this.isUploading = false;
      });
  }


  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filesToUpload.push({
          file,
          preview: e.target.result,  // Data URL
          progress: 0
        });
      };
      reader.readAsDataURL(file); // generates preview URL
    });
  }

  onDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    const files: File[] = Array.from(event.dataTransfer.files);
    this.onFileChange({ target: { files } });
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: any) {
    this.isDragOver = false;
  }

  // onDrop(event: any) {
  //   event.preventDefault();
  //   this.isDragOver = false;
  //   const files = Array.from(event.dataTransfer.files);
  //   this.onFileChange({ target: { files } });
  // }

  removeFile(index: number) {
    this.filesToUpload.splice(index, 1);
  }

  removeMedia(media: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this media?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }).then((result) => {

      if (result.isConfirmed) {

        if (media?.ngo_media_id) {
          // If API required
          this.ngoControllerService.deleteNgoMedia(media.ngo_media_id).subscribe(() => {
            // Remove from array
            this.filteredMedia.splice(index, 1);

            // Success message
            Swal.fire({
              title: 'Deleted!',
              text: 'Your media has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });

          });
        } else {
          this.filteredMedia.splice(index, 1);

          // Success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Your media has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        }


      }

    });
  }


  sendOtp(email: string) {
    this.loader.showLoader();
    this.userService.getResendOtp({ email_id: email }).subscribe({
      next: (res: any) => {
        this.loader.hideLoader();
        this.showOtpSentPopup(email);
      },
      error: (err) => {
        this.loader.hideLoader();
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.error_message || 'Unable to send OTP. Please try again.',
        });
      }
    });
  }

  showOtpSentPopup(email: string) {
    Swal.fire({
      title: 'Verify Your Email',
      html: `
        <div style="text-align:center;">
          
          <p style="margin-bottom:4px;font-size:14px;color:#666;">
            We have sent a verification code to
          </p>
  
          <div style="font-weight:600;font-size:15px;color:#000;margin-bottom:16px;">
            ${email}
          </div>
  
          <input 
            id="otp-input"
            class="swal2-input"
            placeholder="Enter 6-digit OTP"
            maxlength="6"
            type="text"
            inputmode="numeric"
            style="
              width: 240px;
              margin: 0 auto 10px auto;
              text-align: center;
              letter-spacing: 6px;
              font-size: 18px;
              font-weight: 600;
            "
          />
  
          <div style="
            font-size:12px;
            color:#777;
            margin-top:8px;
          ">
            Didn’t receive the code? Check your spam folder
          </div>
  
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Verify OTP',
      denyButtonText: 'Resend OTP',
      cancelButtonText: 'Close',
      confirmButtonColor: '#28a745',
      denyButtonColor: '#ff9800',
      cancelButtonColor: '#adb5bd',
      focusConfirm: false,

      preConfirm: () => {
        const otp = (document.getElementById('otp-input') as HTMLInputElement)?.value;

        if (!otp) {
          Swal.showValidationMessage('OTP is required');
          return false;
        }

        if (!/^[0-9]{6}$/.test(otp)) {
          Swal.showValidationMessage('Please enter a valid 6-digit OTP');
          return false;
        }

        return otp;
      }

    }).then((result) => {

      // 🔁 Resend OTP
      if (result.isDenied) {
        this.sendOtp(email);
        setTimeout(() => this.showOtpSentPopup(email), 300);
      }

      // ✅ Verify OTP
      if (result.isConfirmed) {
        const otp = result.value;
        this.verifyOtp(email, otp);
      }
    });
  }



  verifyOtp(email: string, otp: any) {
    this.loader.showLoader();
    this.userService.getVerifyOtp({ email_id: email, otp: otp }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'OTP Resent 🔁',
          text: 'A new OTP has been sent to your email.',
          timer: 2000,
          showConfirmButton: false
        });

        if (res?.data?.is_verified) {
          this.loader.hideLoader();
          this.formDataWhileCreating.is_authenticated = 1;
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
        }
      },
      error: (err) => {
        this.loader.hideLoader();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showCancelButton: true,
          confirmButtonText: 'Enter OTP Again',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#aaa',
          text: err.error_message || 'Could not resend OTP. Please try again later.',
        }).then((result) => {

          // 🔁 Resend OTP
          if (result.isDenied) {

          }

          // ✅ Verify OTP
          if (result.isConfirmed) {
            setTimeout(() => this.showOtpSentPopup(email), 300);
          }

        });
      }
    });
  }

  createRow(): FormGroup {
    return this.fb.group({
      categrory_document_id: [null],
      ngo_id: [this.routeId], // dynamic if needed
      category_id: ['', Validators.required],
      document_type_id: ['', Validators.required],
      is_mandatory: [1],
      created_by: [1]
    });
  }

  get documents(): FormArray {
    return this.requestDocumentForm.get('documents') as FormArray;
  }

  addRow() {
    this.documents.push(this.createRow());
  }

  removeRow(index: number) {
    this.documents.removeAt(index);
  }

  submitForm() {
    if (this.requestDocumentForm.invalid) {
      this.requestDocumentForm.markAllAsTouched();
      return;
    }

    // const payload = this.requestDocumentForm.value.documents;

    // payload.forEach((item: any) => {
    //   // this.http.post(
    //   //   'http://localhost:3000/api/v1/ngo_request_document_category/create',
    //   //   item,
    //   //   {
    //   //     headers: {
    //   //       'x-access-token': 'YOUR_TOKEN'
    //   //     }
    //   //   }
    //   // ).subscribe(res => {
    //   //   console.log('Created:', res);
    //   // });

    //   if (item.categrory_document_id) {
    //     // 🔵 UPDATE API
    //     this.requestsService
    //       .updateNgoRequestDocumentCategory(item, item.categrory_document_id)
    //       .subscribe(res => {
    //         console.log('Updated:', res);
    //       });

    //   } else {
    //     // 🟢 CREATE API
    //     this.requestsService
    //       .ngoRequestDocumentCategory(item)
    //       .subscribe(res => {
    //         console.log('Created:', res);
    //       });
    //   }

    //   // this.requestsService.ngoRequestDocumentCategory(item).subscribe((res) => {
    //   //   console.log('Created:', res);
    //   // });
    // });

    // console.log('Final Payload:', payload);

    const payload = this.requestDocumentForm.value.documents;

    const apiCalls: any[] = [];

    payload.forEach((item: any) => {

      if (item.categrory_document_id) {

        // UPDATE
        apiCalls.push(
          this.requestsService.updateNgoRequestDocumentCategory(
            item,
            item.categrory_document_id
          )
        );

      } else {

        // CREATE
        apiCalls.push(
          this.requestsService.ngoRequestDocumentCategory(item)
        );

      }

    });

    forkJoin(apiCalls).subscribe({
      next: (res) => {
        console.log('All API completed:', res);
        this.toastService.open('Successfully done operation', 'success');
        // alert('✅ Successfully done operation');

        // optional refresh
        // this.getDocuments();

      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.toastService.open('Something went wrong', 'Error');
        // alert('❌ Something went wrong');
      }
    });

    console.log('Final Payload:', payload);
  }

  getDocumentTypeList() {
    this.subs.add(this.requestDocMasterController.getAllRequestDocumentsMaster().subscribe({
      next: (value) => {
        this.documentTypeList = value.data;
      }
    }))

    this.subs.add(this.ngoFieldService.getAllNGOField().subscribe({
      next: (value) => {
        this.categoryList = value.data;
      }
    }))
  }


  getDocumentsDataById() {
    this.loader.showLoader();
    this.subs.add(this.requestsService.ngoRequestDocumentCategoryGetId(this.routeId).subscribe({
      next: (value: any) => {
        this.loader.hideLoader();

        if (value?.data) {

          // Clear existing rows
          this.documents.clear();

          // If API returns single object
          const data = Array.isArray(value.data) ? value.data : [value.data];

          data.forEach((item: any) => {
            this.documents.push(
              this.fb.group({
                categrory_document_id: [item?.categrory_document_id || null],
                ngo_id: [item.ngo_id],
                category_id: [item.category_id, Validators.required],
                document_type_id: [item.document_type_id, Validators.required],
                is_mandatory: [item.is_mandatory],
                created_by: [item.created_by]
              })
            );
          });
        }
      }, error: (err: any) => {
        this.loader.hideLoader();
      }
    }))
  }

}



