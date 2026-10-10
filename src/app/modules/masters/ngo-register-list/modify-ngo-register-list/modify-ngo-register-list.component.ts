import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';
import { NgoFieldDetailsData } from '@shared/configs/ngo-field-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { LoaderService } from '@shared/services/loader.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NgoRegistrationFormStructure } from '@shared/configs/ngo-registration-config';
import { NGODetailsData } from '@shared/configs/ngo-master-config';
import { FormComponent } from '@shared/component/form/form.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DesignationServiceController } from '@shared/_http/designation.service';
import { DistrictService } from '@shared/_http/district.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { NGOTypesService } from '@shared/_http/ngo-types.service';
import { StateService } from '@shared/_http/state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-ngo-register-list',
  templateUrl: './modify-ngo-register-list.component.html',
  styleUrl: './modify-ngo-register-list.component.scss'
})
export class ModifyNgoRegisterListComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  ngoRegistrationFormStructure: IFormStructure[] = [];
  ngoDetailsData: RowData = NGODetailsData;

  NGO_STATUS = {
    NEED_REAPPROVAL: 52,
    REJECTED: 51,
    APPROVED: 50
  };

  @ViewChild(FormComponent) formComponent!: FormComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngoRegistrationService: NgoControllerService,
    private cityservice: CityService,
    private toastService: ToastService,
    private countryservice: CountryService,
    private stateservice: StateService,
    private cdr: ChangeDetectorRef,
    private ngoControllerService: NgoControllerService,
    private ngoFieldService: NGOFieldService,
    private distrctService: DistrictService,
    private designationService: DesignationServiceController,
    private ngoTypeControllerService: NGOTypesService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.ngoRegistrationFormStructure = JSON.parse(JSON.stringify(NgoRegistrationFormStructure));
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getNgoRegistrationById();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize the form with necessary settings
   */
  initializeForm(): void {
    this.ngoRegistrationFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
    });

    this.ngoRegistrationFormStructure.forEach((ele, index) => {
      if (this.routeName === 'view') {
        ele.disable = true;
      }
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


  /**
   * Fetch NGO field data by ID for edit/view
   */
  getNgoRegistrationById(): void {
    this.loader.showLoader();
    this.subs.add(
      this.ngoRegistrationService.getRegisterNgoById(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoDetailsData.data = res.data;

           if (res.data?.ngo_logo_path) {
              this.ngoDetailsData.data.ngo_logo = res.data?.ngo_logo_path;
            }

            if (res.data?.pan_card_file_url) {
              this.ngoDetailsData.data.pan_file = res.data?.pan_card_file_url;
            }

            if (res.data?.crs_regis_file_path) {
              this.ngoDetailsData.data.crs_regis_file = res.data?.crs_regis_file_path;
            }

            if (res.data?.digital_signature_file_path) {
              this.ngoDetailsData.data.digital_signature_file = res.data?.digital_signature_file_path;
            }

            if (res.data?.stamp_file_path) {
              this.ngoDetailsData.data.stamp_file = res.data?.stamp_file_path;
            }

            if (res.data.unique_id) {
              this.ngoDetailsData.data.registration_type = 'Regi. with Dharpan';
            } else {
              this.ngoDetailsData.data.registration_type = 'Regi. with Non-dharpan';
            }
        }, error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handle form submission for create and edit
   * @param event emitted data from app-form
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.ngoRegistrationService.registerNgo(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Verification created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/verify-ngo-register-master');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;

      case 'edit':
        this.subs.add(
          this.ngoRegistrationService.updateRegisterNgo(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Verification updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/verify-ngo-register-master');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }

  selectValueChange(event: any) {
    if (event.controlName === 'registration_type') {
      this.ngoRegistrationFormStructure.forEach(ele => {
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

  openRemarkPopup(statusId: number, title: string) {
    Swal.fire({
      title,
      input: 'textarea',
      inputPlaceholder: 'Enter remarks...',
      inputAttributes: {
        rows: '4'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Remarks are required!';
        }
        return null;
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.updateNgoStatus(statusId, result.value);
      }
    });
  }

  onNeedReapproval() {
    this.openRemarkPopup(
      this.NGO_STATUS.NEED_REAPPROVAL,
      'Need Reapproval – Add Remark'
    );
  }

  onReject() {
    this.openRemarkPopup(
      this.NGO_STATUS.REJECTED,
      'Reject Registration – Add Remark'
    );
  }

  onApprove() {
    Swal.fire({
      title: 'Approve Registration?',
      text: 'Are you sure you want to approve this NGO?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Approve'
    }).then(result => {
      if (result.isConfirmed) {
        this.updateNgoStatus(this.NGO_STATUS.APPROVED, null);
      }
    });
  }

  updateNgoStatus(statusId: number, remarks: string | null) {
    const payload = {
      status_id: statusId,
      remarks: remarks
    };

    this.ngoRegistrationService.updateRegisterNgoStatus(payload, this.routeId).subscribe({
      next: () => {
        Swal.fire('Success', 'Status updated successfully', 'success');
        this.getNgoRegistrationById(); // refresh data
      },
      error: (err) => {
        let errMsg = err?.error_message ?? 'Failed to update status'
        Swal.fire('Error', errMsg, 'error');
      }
    });
  }



}