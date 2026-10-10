import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DesignationServiceController } from '@shared/_http/designation.service';
import { DistrictService } from '@shared/_http/district.service';
import { LoginService } from '@shared/_http/login.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOTypesService } from '@shared/_http/ngo-types.service';
import { StateService } from '@shared/_http/state.service';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { FormComponent } from '@shared/component/form/form.component';
import { ModifyPopupFormComponent } from '@shared/component/popup-form/modify-popup-form/modify-popup-form.component';
import { NGODetailsData, NGORegistrationTypeSearchGroup, NGOTypeSearchGroup } from '@shared/configs/ngo-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FeathericonComponent, FormsModule, ReactiveFormsModule, FormComponent],
  providers: [NgoControllerService],
  templateUrl: './ngo-registration.component.html',
  styleUrl: './ngo-registration.component.scss'
})
export class NgoRegistrationComponent {
  subs: any;
  ngoDetailsData: RowData = NGODetailsData;
  ngoTypeSearchGroupStructure!: IFormStructure[];
  @ViewChild(FormComponent) formComponent!: FormComponent;
  emailId!: string;
  isVerified = false;
  routeName: any;
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
    private designationService: DesignationServiceController,
    private ngoTypeControllerService: NGOTypesService,
    public loader: LoaderService
  ) { }
  ngOnInit(): void {
    this.subs = new Subscription()
    this.initialization()
    const state = history.state;
    if (state?.email_id && state?.is_verified) {
      this.emailId = state.email_id;
      this.isVerified = state.is_verified;
      this.ngoDetailsData.data.email = this.emailId;
      // call backend
      this.getNgoByEmailID(this.emailId);
    } else {
      // fallback safety
      this.router.navigate(['/auth/login']);
    }

    this.initialization();
  }

  ngAfterViewInit(): void {
    this.initializeJsonData();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  private initializeJsonData(): void {

  }

  initialization(): void {
    // this.ngoDetailsData.data = {
    //   ngo_registration_id: 1,
    //   ngo_name: "HELPING HANDS FOUNDATION",
    //   registration_type: "Regi. with Dharpan",
    //   unique_id: "NGO123456",
    //   darpan_reg_date: "2022-05-10",
    //   ngo_type: 2,
    //   registration_no: "REG-987654",
    //   date_of_registration: "2020-03-15",
    //   act_name: "Societies Registration Act",
    //   city_of_registration_id: 101,
    //   state_of_registration_id: 12,
    //   country_of_registration_id: 1,

    //   address: "123, Charity Street, Near Central Park",
    //   city_id: 101,
    //   state_id: 12,
    //   country_id: 1,
    //   telephone: "022-23456789",
    //   mobile_no: "9876543210",
    //   website_url: "https://www.helpinghands.org",
    //   email: "info@helpinghands.org",
    //   password: "Test@123",

    //   logo_path_name: ""
    // };
    this.ngoTypeSearchGroupStructure = JSON.parse(JSON.stringify(NGORegistrationTypeSearchGroup));
    this.ngoTypeSearchGroupStructure.forEach((ele, index) => {
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  getNgoByEmailID(email: string) {
    this.loader.showLoader();
    this.subs.add(
      this.ngoControllerService.getRegisterNgoByEmailId(email).subscribe({
        next: (res: any) => {
          this.loader.hideLoader();
          if (res?.data) {
            this.routeName = 'edit';
            // Patch data into form
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
          } else {
            // No data → keep empty form
            this.ngoDetailsData.data = {};
            this.ngoDetailsData.data.email_id = email;
            this.routeName = 'create';

          }
        },
        error: () => {
          this.loader.hideLoader();
          this.ngoDetailsData.data = {};
          this.ngoDetailsData.data.email_id = email;
          this.routeName = 'create';

        }
      })
    );
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


  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));

    if (formData?.ngo_registration_id) {
      // this.subs.add(
      //   this.ngoControllerService.updateRegisterNgo(formData, formData?.ngo_registration_id).subscribe({
      //     next: (value) => {
      //       this.loader.hideLoader();
      //       this.toastService.open('NGO Updated Successfully', 'success');
      //       this.router.navigateByUrl("/auth/login");
      //     },
      //     error: () => {
      //       this.loader.hideLoader();
      //       this.toastService.open('Something went wrong!', 'error');
      //     }
      //   })
      // );
      this.finalSubmit(formData);
    } else {

      Swal.fire({
        title: 'Confirm Submission',
        //     html: `
        //   <div style="text-align:left;">
        //     <p style="margin-bottom:10px;">
        //       Please accept our 
        //       <a href="https://www.karmas.in.net/terms-and-conditions.html" target="_blank" style="color:#3085d6;font-weight:600;">
        //         Terms & Conditions
        //       </a> 
        //       and 
        //       <a href="https://www.karmas.in.net/privacy-policy.html" target="_blank" style="color:#3085d6;font-weight:600;">
        //         Privacy Policy
        //       </a>.
        //     </p>

        //     <div style="display:flex;align-items:center;">
        //       <input type="checkbox" id="acceptTerms" style="margin-right:8px;" />
        //       <label for="acceptTerms">I agree to the Terms & Conditions</label>
        //     </div>
        //   </div>
        // `,
        html: `
  <div style="text-align:left;">

    <p style="margin-bottom:10px;">
      Please accept our
      <a href="https://www.karmas.in.net/terms-and-conditions.html" target="_blank" style="color:#3085d6;font-weight:600;">
        Terms & Conditions
      </a>
      and
      <a href="https://www.karmas.in.net/privacy-policy.html" target="_blank" style="color:#3085d6;font-weight:600;">
        Privacy Policy
      </a>.
    </p>

    <div style="margin:15px 0;padding:12px;border-radius:8px;background:#f8f9fa;border-left:4px solid #28a745;">
      <strong>What happens next?</strong>
      <p style="margin:8px 0 0 0;font-size:14px;line-height:1.5;">
        Karmas will verify your details and review your application.
        Once approved, you will receive an email containing your
        <strong>Username</strong>, <strong>Temporary Password</strong>, and instructions to access the
        <strong>Karmas NGO Portal</strong>.
      </p>

      <p style="margin:10px 0 0 0;font-weight:600;color:#28a745;">
        Thank you for joining Karmas!
      </p>
    </div>

    <div style="display:flex;align-items:flex-start;">
      <input type="checkbox" id="acceptTerms" style="margin-right:8px;margin-top:3px;" />
      <label for="acceptTerms">
        I have read and agree to the Terms & Conditions and Privacy Policy.
      </label>
    </div>

  </div>
`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        preConfirm: () => {
          const checkbox = (document.getElementById('acceptTerms') as HTMLInputElement);
          if (!checkbox.checked) {
            Swal.showValidationMessage('You must accept Terms & Conditions before submitting');
            return false;
          }
          return true;
        },
        showClass: {
          popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate__animated animate__zoomOut'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.finalSubmit(formData);
        }
      });
    }
  }


  finalSubmit(formData: any) {

    if (this.ngoDetailsData?.data?.ngo_logo_file && this.ngoDetailsData?.data?.ngo_logo) {
      formData.ngo_logo_file = this.ngoDetailsData.data.ngo_logo_file;
      formData.ngo_logo = this.ngoDetailsData.data.ngo_logo;
    }

    if (this.ngoDetailsData?.data?.pan_file && this.ngoDetailsData?.data?.pan_cad_file_name) {
      formData.pan_file = this.ngoDetailsData.data.pan_file;
      formData.pan_cad_file_name = this.ngoDetailsData.data.pan_cad_file_name;
    }

    if (this.ngoDetailsData?.data?.crs_regis_file && this.ngoDetailsData?.data?.crs_regis_file_name) {
      formData.crs_regis_file = this.ngoDetailsData.data.crs_regis_file;
      formData.crs_regis_file_name = this.ngoDetailsData.data.crs_regis_file_name;
    }

    if (this.ngoDetailsData?.data?.digital_signature_file && this.ngoDetailsData?.data?.digital_signature_file_name) {
      formData.digital_signature_file = this.ngoDetailsData.data.digital_signature_file;
      formData.digital_signature_file_name = this.ngoDetailsData.data.digital_signature_file_name;
    }

    if (this.ngoDetailsData?.data?.stamp_file && this.ngoDetailsData?.data?.stamp_file_name) {
      formData.stamp_file = this.ngoDetailsData.data.stamp_file;
      formData.stamp_file_name = this.ngoDetailsData.data.stamp_file_name;
    }

    this.loader.showLoader();

    if (formData?.ngo_registration_id) {
      this.subs.add(
        this.ngoControllerService.updateRegisterNgo(formData, formData?.ngo_registration_id).subscribe({
          next: (value) => {
            this.loader.hideLoader();
            this.toastService.open('NGO Updated Successfully', 'success');
            this.router.navigateByUrl("/auth/login");
          },
          error: () => {
            this.loader.hideLoader();
            this.toastService.open('Something went wrong!', 'error');
          }
        })
      );
    } else {
      this.subs.add(
        this.ngoControllerService.registerNgo(formData).subscribe({
          next: () => {
            this.loader.hideLoader();
            this.toastService.open('NGO Registered Successfully', 'success');
            this.router.navigateByUrl("/auth/login");
          },
          error: () => {
            this.loader.hideLoader();
            this.toastService.open('Something went wrong!', 'error');
          }
        })
      );
    }
  }



  // handleSubmit(event: any) {
  //   let formData = JSON.parse(JSON.stringify(event["formValue"]));

  //   if (this.ngoDetailsData?.data?.ngo_logo_file && this.ngoDetailsData?.data?.ngo_logo) {
  //     formData.ngo_logo_file = this.ngoDetailsData.data.ngo_logo_file;
  //     formData.ngo_logo = this.ngoDetailsData.data.ngo_logo;
  //   }

  //   if (this.ngoDetailsData?.data?.pan_file && this.ngoDetailsData?.data?.pan_cad_file_name) {
  //     formData.pan_file = this.ngoDetailsData.data.pan_file;
  //     formData.pan_cad_file_name = this.ngoDetailsData.data.pan_cad_file_name;
  //   }

  //   if (this.ngoDetailsData?.data?.crs_regis_file && this.ngoDetailsData?.data?.crs_regis_file_name) {
  //     formData.crs_regis_file = this.ngoDetailsData.data.crs_regis_file;
  //     formData.crs_regis_file_name = this.ngoDetailsData.data.crs_regis_file_name;
  //   }

  //   if (this.ngoDetailsData?.data?.digital_signature_file && this.ngoDetailsData?.data?.digital_signature_file_name) {
  //     formData.digital_signature_file = this.ngoDetailsData.data.digital_signature_file;
  //     formData.digital_signature_file_name = this.ngoDetailsData.data.digital_signature_file_name;
  //   }

  //   if (this.ngoDetailsData?.data?.stamp_file && this.ngoDetailsData?.data?.stamp_file_name) {
  //     formData.stamp_file = this.ngoDetailsData.data.stamp_file;
  //     formData.stamp_file_name = this.ngoDetailsData.data.stamp_file_name;
  //   }

  //   if (formData?.ngo_registration_id) {
  //     this.subs.add(this.ngoControllerService.updateRegisterNgo(formData, formData?.ngo_registration_id).subscribe({
  //       next: (value) => {
  //         this.loader.hideLoader();
  //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
  //         this.toastService.open(message, 'success');
  //         this.router.navigateByUrl("/auth/login")
  //       },
  //       error: (err) => {
  //         this.loader.hideLoader();
  //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
  //         this.toastService.open(message, 'error');
  //       }
  //     }))
  //   } else {
  //     this.subs.add(this.ngoControllerService.registerNgo(formData).subscribe({
  //       next: (value) => {
  //         this.loader.hideLoader();
  //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
  //         this.toastService.open(message, 'success');
  //         this.router.navigateByUrl("/auth/login")
  //       },
  //       error: (err) => {
  //         this.loader.hideLoader();
  //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
  //         this.toastService.open(message, 'error');
  //       }
  //     }))
  //   }

  // }


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

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Registration Approved':
        return 'status-approved';

      case 'Need ReUpdation':
        return 'status-reapproval';

      case 'Registration Rejected':
        return 'status-rejected';

      case 'Under Review/Verification':
        return 'Under Review/Verification';

      default:
        return 'status-default';
    }
  }


}
