import { Location } from '@angular/common';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { PermissionPageTableControllerService } from '@shared/_http/permissions-table.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { RequestsService } from '@shared/_http/requests.service';
import { StateService } from '@shared/_http/state.service';
import { UserService } from '@shared/_http/user_master.service';
import { FormComponent } from '@shared/component/form/form.component';
import { RequestDetailsSearchGroup, RequestsDetailsData } from '@shared/configs/requests-config';
import { UserMasterData, UserMasterFormGroup } from '@shared/configs/user-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modify-user-master',
  templateUrl: './modify-user-master.component.html',
  styleUrl: './modify-user-master.component.scss'
})
export class ModifyUserMasterComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  requestSearchGroupStructure!: IFormStructure[];
  requestDetailsData: RowData = UserMasterData;
  formDataWhileCreating: any;
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private cityservice: CityService,
    private toastService: ToastService,
    private countryservice: CountryService,
    private stateservice: StateService,
    private requestsService: RequestsService,
    private userService: UserService,
    private roleControllerService: PermissionControllerService,
    private ngoControllerService: NgoControllerService,
    private loader: LoaderService
  ) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.requestSearchGroupStructure = JSON.parse(JSON.stringify(UserMasterFormGroup));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initialization()
  }

  ngAfterViewInit(): void {
    if (this.routeId)
      this.getUserMaster()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.requestSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'edit') {
        if (ele.name == 'password') {
          ele.required = false;
          ele.hiddenControl = true;
          this.formComponent.updateValidator(ele.name, false);
        }
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
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {

      case 'ngo-id':
        this.subs.add(this.ngoControllerService.getAllNgo().subscribe({
          next: (value) => {
            // const newRes = new EncryptionAPILayer().decryptData(value.resBody); // Decrypt data if necessary
            // const dataValue = newRes.data;
            ele.listData = value.data
          }
        }))
        break;
      case 'role-id':
        this.subs.add(this.roleControllerService.getAllRole().subscribe({
          next: (value) => {
            // const newRes = new EncryptionAPILayer().decryptData(value.resBody); // Decrypt data if necessary
            // const dataValue = newRes.data;
            ele.listData = value.data
          }
        }))
        break;
      case "active_status":
        ele.listData = [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }]
        break
      case "country":
        this.subs.add(this.countryservice.getAllCountry().subscribe({
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
    }
  }

  getUserMaster() {
    this.subs.add(this.userService.getUser(this.routeId).subscribe({
      next: (value) => {
        this.requestDetailsData.data = value.data;
        if (value.data?.file_path) {
          this.requestDetailsData.data.upload_photo = value.data.file_path;
        }
      }
    }))
  }

  onExtraButtonEmitChangeEmit(event: any) {
    // console.log('event -= ', event);
    if (event.type === 'Verify') {
      const email = event.value;
      this.openVerifyPopup(email);
    }
  }

  openVerifyPopup(email: string) {
    Swal.fire({
      title: 'Verify Email',
      html: `
      <p class="mb-1">We will send an OTP to:</p>
      <strong>${email}</strong>
    `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Send OTP',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendOtp(email);
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
          this.subs.add(this.userService.createUser(this.formDataWhileCreating).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl("/user-master")
            },
            error: (err) => {
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



  handleFileUpload(event: any): void {
    console.log('event. = ', event);
    if (event?.fieldName === "upload_photo") {
      this.requestDetailsData.data.Base64File = event.base64String;
      this.requestDetailsData.data.file_name = event.imgName;
    }
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    // formData.role_id = '1',
    if (!formData.ngo_id) {
      formData.ngo_id = null
    }

    if (this.requestDetailsData?.data?.Base64File && this.requestDetailsData?.data?.file_name) {
      formData.Base64File = this.requestDetailsData.data.Base64File;
      formData.file_name = this.requestDetailsData.data.file_name;
    }
    switch (this.routeName) {
      case 'create':
        this.loader.hideLoader();
        this.formDataWhileCreating = formData;
        this.sendOtp(formData.email_id)
        // this.subs.add(this.userService.createUser(formData).subscribe({
        //   next: (value) => {
        //     const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
        //     this.toastService.open(message, 'success');
        //     this.router.navigateByUrl("/user-master")
        //   },
        //   error: (err) => {
        //     const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
        //     this.toastService.open(message, 'error');
        //   }
        // }))
        break;
      case 'edit':
        delete formData.password
        this.subs.add(this.userService.updateUser(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/user-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;

    }
  }

}



