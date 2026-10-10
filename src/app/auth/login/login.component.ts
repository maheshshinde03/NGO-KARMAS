import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '@shared/_http/login.service';
import { ToastService } from '@shared/services/toast.service';
import { EncryptedStorage } from '@shared/utils/encrypted-storage';
import { GlobalConfig } from '@shared/configs/global-config';
import { HttpErrorResponse } from '@angular/common/http';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { currentUser } from '@shared/utils/current-user';
import { NavmenuService } from '@shared/services/navmenu.service';
import { AuthGuard } from '@shared/guard/auth.guard';
import { PermissionsService } from '@shared/services/PermissionsService';
import { AdminMenu, NgoMenu } from '@shared/constants/routeTemp';
import Swal from 'sweetalert2';
import { DesignationPermissionControllerService } from '@shared/_http/designation-permission.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FeathericonComponent, FormsModule, ReactiveFormsModule],
  providers: [LoginService, DesignationPermissionControllerService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public show: boolean = false;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, private loginservice: LoginService, private toastService: ToastService, public navmenu: NavmenuService, private authGuard: AuthGuard, private permissionsService: PermissionsService,
    private DesignationControllerService: DesignationPermissionControllerService, private loader: LoaderService
  ) {

    const userData = localStorage.getItem(new GlobalConfig().authToken);
    if (userData?.length != null) {
      this.router.navigate([new GlobalConfig().dashboardRoute])
    }
    else
      this.router.navigate([new GlobalConfig().loginRoute])

    this.loginForm = this.fb.group({
      user_name: ["", [Validators.required]],
      password: ["", Validators.required],
    });

  }
  showPassword() {
    this.show = !this.show;
  }

  login() {
    this.loader.showLoader();
    this.loginservice.login(this.loginForm.value).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        if (value?.data?.userDetails?.role === 'COMMON USER') {
          this.router.navigate([new GlobalConfig().loginRoute])
          return
        }
        this.toastService.open("Login Successful", "success")
        new EncryptedStorage().clearAll();
        new EncryptedStorage().setItem(new GlobalConfig().authToken, value.data.token, false)
        new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify(value.data.userDetails), false);
        this.authGuard.resetGuard();
        console.log('value?.data = ', value?.data);
        if (value?.data?.userDetails?.role === 'ADMIN') {
          const permissions = value.data.permission.normal_permission;
          new EncryptedStorage().setItem(new GlobalConfig().pagePermissions, JSON.stringify(permissions), false);
          // this.navmenu.intializeMenu(AdminMenu.menu);
          // new EncryptedStorage().setItem(new GlobalConfig().menu, JSON.stringify(AdminMenu.menu), false);
          const filteredMenu = this.filterMenuByPermissions(AdminMenu.menu, permissions);
          new EncryptedStorage().setItem(new GlobalConfig().menu, JSON.stringify(filteredMenu), false);
          new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify({
            ...value.data.userDetails,
            menu: JSON.stringify(filteredMenu)  // Update with filtered menu
          }), false);
          this.navmenu.intializeMenu(filteredMenu);
          this.permissionsService.loadPermissions();
          this.router.navigate([new GlobalConfig().dashboardRoute])
        }
        else if (value?.data?.userDetails?.role === 'NGO') {
          const permissions = value.data.permission.normal_permission;
          new EncryptedStorage().setItem(new GlobalConfig().pagePermissions, JSON.stringify(permissions), false);
          // this.navmenu.intializeMenu(NgoMenu.menu);
          const filteredMenu = this.filterMenuByPermissions(AdminMenu.menu, permissions);
          // const filteredMenu = this.filterMenuByPermissions(NgoMenu.menu, permissions);
          new EncryptedStorage().setItem(new GlobalConfig().menu, JSON.stringify(filteredMenu), false);
          new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify({
            ...value.data.userDetails,
            menu: JSON.stringify(filteredMenu)  // Update with filtered menu
          }), false);
          this.navmenu.intializeMenu(filteredMenu);
          this.permissionsService.loadPermissions();
          this.router.navigate([new GlobalConfig().dashboardRoute])

        }
        else if (value?.data?.userDetails?.role === 'NGO_USER') {
          this.DesignationControllerService.getDesignationPermissionIDForLogin(value?.data?.userDetails?.designation_id).subscribe({
            next: response => {
              const permissions = response.data;
              new EncryptedStorage().setItem(new GlobalConfig().pagePermissions, JSON.stringify(permissions), false);
              // this.navmenu.intializeMenu(NgoMenu.menu);
              const filteredMenu = this.filterMenuByPermissions(AdminMenu.menu, permissions);
              // const filteredMenu = this.filterMenuByPermissions(NgoMenu.menu, permissions);
              new EncryptedStorage().setItem(new GlobalConfig().menu, JSON.stringify(filteredMenu), false);
              new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify({
                ...value.data.userDetails,
                menu: JSON.stringify(filteredMenu)  // Update with filtered menu
              }), false);
              this.navmenu.intializeMenu(filteredMenu);
              this.permissionsService.loadPermissions();

              // ✅ Navigate to first permitted page
              if (permissions && permissions.length > 0) {
                const firstRoute = permissions[0].page_url;
                this.router.navigate([firstRoute]);
              } else {
                this.authGuard.resetGuard();
                new EncryptedStorage().clearAll();
                this.router.navigate(['/auth/login'])
                return;
              }
              // this.router.navigate([new GlobalConfig().dashboardRoute])
            },
            error: () => {
              this.loader.hideLoader();
            }
          });

        }
        else {
          const permissions = value.data.permission.normal_permission;
          new EncryptedStorage().setItem(new GlobalConfig().pagePermissions, JSON.stringify(permissions), false);
          // this.navmenu.intializeMenu(NgoMenu.menu);
          const filteredMenu = this.filterMenuByPermissions(AdminMenu.menu, permissions);
          new EncryptedStorage().setItem(new GlobalConfig().menu, JSON.stringify(filteredMenu), false);
          new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify({
            ...value.data.userDetails,
            menu: JSON.stringify(filteredMenu)  // Update with filtered menu
          }), false);
          this.navmenu.intializeMenu(filteredMenu);

          this.permissionsService.loadPermissions();
          this.router.navigate([new GlobalConfig().dashboardRoute])
        }
        // this.navmenu.intializeMenu(JSON.parse(value.data.userDetails.menu));
        // this.loginservice.getPermissiologin(value.data.userDetails.role_id).subscribe({
        //   next: (permissionsResponse) => {
        //     const permissions = permissionsResponse.data;
        //     new EncryptedStorage().setItem(new GlobalConfig().pagePermissions, JSON.stringify(permissions), false);
        //      // Assuming you have the menu data stored or accessible here
        //     const menuData = JSON.parse(value.data.userDetails.menu); // Update this according to your actual implementation

        //     const filteredMenu = this.filterMenuByPermissions(menuData, permissions);
        //     new EncryptedStorage().setItem(new GlobalConfig().userDetails, JSON.stringify({
        //       ...value.data.userDetails,
        //       menu: JSON.stringify(filteredMenu)  // Update with filtered menu
        //     }), false);
        //     // console.log('filteredMenu = ',filteredMenu);

        //     this.navmenu.intializeMenu(filteredMenu);
        //     this.permissionsService.loadPermissions();
        //     this.router.navigate([new GlobalConfig().dashboardRoute])

        // },error:(err)=>{
        //   this.toastService.open("'Access denied : Permission Not Granted", "error");
        //   new EncryptedStorage().clearAll();
        // }})
      }, error: (err) => {
        this.loader.hideLoader();
        switch (err instanceof HttpErrorResponse) {
          case err.status === 401:
            this.toastService.open("UnAuthorized User", "error")
            break;
          case err.status === 500:
            this.toastService.open("Internal Server Error", "error")
            break;
          case err.status === 404:
            this.toastService.open("Not Found", "error")
            break;
          case err.status === 400:
            this.toastService.open("Bad_Request", "error")
            break;
          default:
            this.toastService.open("Something went wrong", "error")
            break
        }
      }
    })
  }

  // private filterMenuByPermissions(menu: any[], permissions: any[]) {
  //   // Create a map of page URLs to permissions for quick lookup
  //   const permissionMap = new Map();
  //   permissions.forEach(p => permissionMap.set(p.page_url, p));

  //   // Recursive function to filter menu items
  //   function filterItems(items: any[]): any[] {
  //     return items
  //       .filter(item => {
  //         if (item.path) {
  //           // If item is a link, check if it's in the permission map
  //           return permissionMap.has(item.path);
  //         } else if (item.children) {
  //           // If item has children, recursively filter them
  //           item.children = filterItems(item.children);
  //           // Show this item only if it has at least one valid child
  //           return item.children.length > 0;
  //         }
  //         return false;
  //       });
  //   }

  //   return filterItems(menu);
  // }

  private filterMenuByPermissions(menu: any[], permissions: any[]) {
    // Create a map of page URLs to permissions for quick lookup
    const permissionMap = new Map<string, any>();
    permissions.forEach(p => permissionMap.set(p.page_url, p));

    // Recursive function to filter menu items
    function filterItems(items: any[]): any[] {
      return items
        .map(item => {
          if (item.path) {
            // If it's a link, include it only if it has permission
            return permissionMap.has(item.path) ? { ...item } : null;
          } else if (item.children) {
            // If it has children, recursively filter them
            const filteredChildren = filterItems(item.children);
            if (filteredChildren.length > 0) {
              return { ...item, children: filteredChildren };
            }
          }
          return null;
        })
        .filter(Boolean); // remove nulls
    }

    return filterItems(menu);
  }

  forgotPaassword() {
    this.router.navigate(['/auth/forgot-password'])
  }

  ngoRegistration() {
    // this.router.navigate(['/auth/ngo-register']);
    this.openEmailPopup();
  }

  openEmailPopup() {
    Swal.fire({
      title: 'Email Verification',
      html: `
      <div style="
        text-align:center;
        padding:4px 0;
      ">

        <p style="
          font-size:14px;
          color:#6c757d;
          margin-bottom:14px;
        ">
          Please enter your email address to continue
        </p>

        <input 
          id="email-input"
          class="swal2-input"
          placeholder="example@email.com"
          type="email"
          autocomplete="email"
          style="
            width: 260px;
            margin: 0 auto;
            text-align: center;
            font-size: 15px;
            border-radius: 8px;
          "
        />

        <div style="
          font-size:12px;
          color:#adb5bd;
          margin-top:10px;
        ">
          We’ll send a one-time verification code
        </div>

      </div>
    `,
      icon: 'info',
      confirmButtonText: 'Send Verification Code',
      confirmButtonColor: '#2563eb', // modern blue
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      cancelButtonColor: '#adb5bd',
      focusConfirm: false,

      preConfirm: () => {
        const email = (document.getElementById('email-input') as HTMLInputElement)?.value?.trim();

        if (!email) {
          Swal.showValidationMessage('Email address is required');
          return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          Swal.showValidationMessage('Please enter a valid email address');
          return false;
        }

        return email;
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.sendOtp(result.value);
      }
    });
  }



  sendOtp(email: string) {
    this.loader.showLoader();
    this.loginservice.verifyEmailAndSendOtp({ email_id: email }).subscribe({
      next: () => {
        this.loader.hideLoader();
        this.openOtpPopup(email);
      },
      error: (err) => {
        this.loader.hideLoader();
        let errMsg = err?.error?.error_message ?? 'Failed to send OTP. Try again.'
        Swal.fire('Error', errMsg, 'error');
      }
    });
  }

  openOtpPopup(email: string) {
    Swal.fire({
      title: 'Enter OTP',
      html: `
      <div style="text-align:center;">
        <p style="font-size:13px;color:#666;margin-bottom:6px;">
          OTP sent to
        </p>

        <div style="font-weight:600;margin-bottom:14px;">
          ${email}
        </div>

        <input 
          id="otp-input"
          class="swal2-input"
          placeholder="Enter 6-digit OTP"
          maxlength="6"
          inputmode="numeric"
          style="
            width:220px;
            margin:0 auto;
            text-align:center;
            letter-spacing:6px;
            font-size:18px;
            font-weight:600;
          "
        />

        <div style="font-size:12px;color:#777;margin-top:8px;">
          Check spam folder if not received
        </div>
      </div>
    `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Verify OTP',
      denyButtonText: 'Resend OTP',
      confirmButtonColor: '#28a745',
      denyButtonColor: '#ff9800',
      cancelButtonText: 'Close',
      focusConfirm: false,

      preConfirm: () => {
        const otp = (document.getElementById('otp-input') as HTMLInputElement)?.value;

        if (!/^[0-9]{6}$/.test(otp)) {
          Swal.showValidationMessage('Enter valid 6-digit OTP');
          return false;
        }
        return otp;
      }

    }).then(result => {

      if (result.isDenied) {
        this.sendOtp(email);
        setTimeout(() => this.openOtpPopup(email), 300);
      }

      if (result.isConfirmed) {
        this.verifyOtp(email, result.value);
      }
    });
  }

  verifyOtp(email: string, otp: string) {
    this.loader.showLoader();
    this.loginservice.getVerifyOtp({ email_id: email, otp }).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Email Verified',
          text: 'Redirecting to registration...',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          const navigationExtras: NavigationExtras = {
            state: {
              email_id: res.data.email_id,
              is_verified: res.data.is_verified
            }
          };

          this.loader.hideLoader();
          this.router.navigate(['/auth/ngo-register'], navigationExtras);
        });
      },
      error: () => {
        this.loader.hideLoader();
        Swal.fire('Invalid OTP', 'Please try again', 'error')
          .then(() => this.openOtpPopup(email));
      }
    });
  }



}
