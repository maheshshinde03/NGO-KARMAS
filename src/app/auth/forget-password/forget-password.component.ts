import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ForgotPasswordService } from '@shared/_http/forgot-password.service';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { AuthGuard } from '@shared/guard/auth.guard';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { EncryptedStorage } from '@shared/utils/encrypted-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FeathericonComponent, FormsModule, ReactiveFormsModule],
  providers: [ForgotPasswordService],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  public show: boolean = false;
  public showOld: boolean = false;
  public resetForm: FormGroup;
  constructor(private fb: FormBuilder, public router: Router, private authService: ForgotPasswordService, private toastService: ToastService, public loader: LoaderService, private authGuard: AuthGuard) {
    console.log('currentUser() = ', currentUser());
    this.resetForm = this.fb.group({
      email: ["", [Validators.required]],
      // old_password: ["", Validators.required],
      // password: ["", Validators.required],
    });

  }
  showPassword() {
    this.show = !this.show;
  }

  showOldPassword() {
    this.showOld = !this.showOld;
  }

  // updatePassword() {
  //   this.loader.showLoader();
  //   this.authService.resetUpdatePassword(this.resetForm.value).subscribe({
  //     next: (value) => {
  //       this.loader.hideLoader();
  //       this.toastService.open("Update Successful", "success");
  //       this.logOut();
  //     }, error: (err) => {
  //       const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
  //       this.toastService.open(message, 'error');
  //       console.error('Passwords do not match');
  //       this.loader.hideLoader();
  //     }
  //   })
  // }

  logOut() {
    this.authGuard.resetGuard();
    new EncryptedStorage().clearAll();
    this.router.navigate(['/auth/login'])
  }


  updatePassword() {
    Swal.fire({
      title: 'Secure Password Update 🔐',
      text: 'We will send an OTP to your registered email',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Send OTP',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#6b7280',
      //   backdrop: `
      //   rgba(15,23,42,0.8)
      //   url("https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif")
      //   center top
      //   no-repeat
      // `
    }).then((result) => {
      if (result.isConfirmed) {
        this.sendOtp();
      }
    });
  }

  sendOtp() {
    this.loader.showLoader();

    this.authService.sendOtp({ email: this.resetForm.value.email }).subscribe({
      next: () => {
        this.loader.hideLoader();
        this.verifyOtpPopup(this.resetForm.value.email);
      },
      error: () => {
        this.loader.hideLoader();
        this.toastService.open('Failed to send OTP', 'error');
      }
    });
  }

  // verifyOtpPopup() {
  //   Swal.fire({
  //     title: 'Verify OTP ✉️',
  //     html: `
  //     <p class="text-muted mb-2">Enter the 6-digit OTP sent to your email</p>
  //     <input id="otp" class="swal2-input" placeholder="Enter OTP" maxlength="6">
  //   `,
  //     confirmButtonText: 'Verify',
  //     confirmButtonColor: '#22c55e',
  //     showCancelButton: true,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       const otp = (document.getElementById('otp') as HTMLInputElement).value;
  //       if (!otp || otp.length < 6) {
  //         Swal.showValidationMessage('Please enter a valid OTP');
  //       }
  //       return otp;
  //     },
  //     showClass: {
  //       popup: 'animate__animated animate__zoomIn'
  //     },
  //     hideClass: {
  //       popup: 'animate__animated animate__zoomOut'
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       
  //     }
  //   });
  // }

  verifyOtpPopup(email: string) {
    Swal.fire({
      title: 'Verify OTP ✉️',
      html: `
        <div style="text-align:center;padding:6px 4px;">
  
          <!-- Icon -->
          <div style="
            width:64px;
            height:64px;
            margin:0 auto 12px;
            border-radius:50%;
            background:linear-gradient(135deg,#22c55e,#16a34a);
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 8px 24px rgba(34,197,94,.35);
          ">
            <i class="icofont-email" style="font-size:30px;color:#fff;"></i>
          </div>
  
          <!-- Text -->
          <p style="margin-bottom:4px;font-size:14px;color:#6b7280;">
            We’ve sent a verification code to
          </p>
  
          <div style="
            font-weight:600;
            font-size:15px;
            color:#111827;
            margin-bottom:18px;
          ">
            ${email}
          </div>
  
          <!-- OTP Input -->
          <input 
            id="otp-input"
            class="swal2-input"
            placeholder="••••••"
            maxlength="6"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            style="
              width:240px;
              margin:0 auto;
              text-align:center;
              letter-spacing:8px;
              font-size:20px;
              font-weight:700;
              border-radius:10px;
              border:1px solid #e5e7eb;
              box-shadow:0 4px 12px rgba(0,0,0,.06);
            "
          />
  
          <!-- Helper -->
          <div style="
            font-size:12px;
            color:#6b7280;
            margin-top:12px;
          ">
            Didn’t receive the code?  
            <span style="color:#2563eb;font-weight:500;">Check spam or resend</span>
          </div>
  
        </div>
      `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Verify OTP',
      denyButtonText: 'Resend OTP',
      cancelButtonText: 'Close',
      confirmButtonColor: '#16a34a',
      denyButtonColor: '#f59e0b',
      cancelButtonColor: '#9ca3af',
      focusConfirm: false,

      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      },

      preConfirm: () => {
        const otp = (document.getElementById('otp-input') as HTMLInputElement).value;
        if (!otp || otp.length !== 6) {
          Swal.showValidationMessage('Please enter a valid 6-digit OTP');
        }
        return otp;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('OTP Verified:', result.value);
        this.newPasswordPopup(result.value);
        // call verify OTP API
      }

      if (result.isDenied) {
        console.log('Resend OTP clicked');
        this.sendOtp();
        setTimeout(() => this.verifyOtpPopup(email), 300);
        // call resend OTP API
      }
    });
  }


  newPasswordPopup(otp: string) {
    Swal.fire({
      title: 'Create New Password 🔑',
      html: `
        <div style="text-align:center;padding:6px 4px;">
  
          <!-- Icon -->
          <div style="
            width:64px;
            height:64px;
            margin:0 auto 14px;
            border-radius:50%;
            background:linear-gradient(135deg,#2563eb,#1d4ed8);
            display:flex;
            align-items:center;
            justify-content:center;
            box-shadow:0 10px 28px rgba(37,99,235,.35);
          ">
            <i class="icofont-lock" style="font-size:30px;color:#fff;"></i>
          </div>
  
          <!-- Info -->
          <p style="
            margin-bottom:14px;
            font-size:14px;
            color:#6b7280;
          ">
            Choose a strong password to keep your account secure
          </p>
  
          <!-- Password -->
          <div style="position:relative;">
            <input 
              id="password"
              type="password"
              class="swal2-input"
              placeholder="New Password"
              style="
                border-radius:10px;
                padding-left:42px;
                box-shadow:0 4px 12px rgba(0,0,0,.06);
              "
            />
            <i class="icofont-key" style="
              position:absolute;
              left:18px;
              top:18px;
              color:#6b7280;
            "></i>
          </div>
  
          <!-- Confirm Password -->
          <div style="position:relative;">
            <input 
              id="confirmPassword"
              type="password"
              class="swal2-input"
              placeholder="Confirm Password"
              style="
                border-radius:10px;
                padding-left:42px;
                box-shadow:0 4px 12px rgba(0,0,0,.06);
              "
            />
            <i class="icofont-lock" style="
              position:absolute;
              left:18px;
              top:18px;
              color:#6b7280;
            "></i>
          </div>
  
          <!-- Hint -->
          <div style="
            font-size:12px;
            color:#9ca3af;
            margin-top:6px;
          ">
            Minimum 6 characters • Use letters & numbers
          </div>
  
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update Password',
      confirmButtonColor: '#2563eb',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#9ca3af',
      focusConfirm: false,

      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster'
      },

      preConfirm: () => {
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

        if (!password || password.length < 6) {
          Swal.showValidationMessage('Password must be at least 6 characters');
          return;
        }

        if (password !== confirmPassword) {
          Swal.showValidationMessage('Passwords do not match');
          return;
        }

        return { password };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalUpdatePassword(otp, result.value.password);
      }
    });
  }

  // newPasswordPopup(otp: string) {
  //   Swal.fire({
  //     title: 'Create New Password 🔑',
  //     html: `
  //     <input id="password" type="password" class="swal2-input" placeholder="New Password">
  //     <input id="confirmPassword" type="password" class="swal2-input" placeholder="Confirm Password">
  //   `,
  //     confirmButtonText: 'Update Password',
  //     confirmButtonColor: '#2563eb',
  //     showCancelButton: true,
  //     preConfirm: () => {
  //       const password = (document.getElementById('password') as HTMLInputElement).value;
  //       const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

  //       if (!password || password.length < 6) {
  //         Swal.showValidationMessage('Password must be at least 6 characters');
  //       }
  //       if (password !== confirmPassword) {
  //         Swal.showValidationMessage('Passwords do not match');
  //       }

  //       return { password };
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.finalUpdatePassword(otp, result.value.password);
  //     }
  //   });
  // }

  finalUpdatePassword(otp: string, password: string) {
    this.loader.showLoader();

    const payload = {
      email: this.resetForm.value.email,
      otp: otp,
      newPassword: password
    };

    this.authService.resetUpdatePassword(payload).subscribe({
      next: () => {
        this.loader.hideLoader();

        Swal.fire({
          icon: 'success',
          title: 'Password Updated 🎉',
          text: 'Please login again with your new password',
          confirmButtonColor: '#16a34a',
          timer: 2500,
          showConfirmButton: false
        });

        setTimeout(() => this.logOut(), 2500);
      },
      error: (err) => {
        this.loader.hideLoader();
        Swal.fire('Error', err.error_message || 'Something went wrong', 'error');
      }
    });
  }


}
