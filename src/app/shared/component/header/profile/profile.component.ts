import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/outside.directive';
import { EncryptedStorage } from '@shared/utils/encrypted-storage';
import { currentUser } from '@shared/utils/current-user';
import { CommonDataService } from '@shared/services/common.service';
import { AuthGuard } from '@shared/guard/auth.guard';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ResetPasswordComponent } from 'app/auth/reset-password/reset-password.component';
import { UserService } from '@shared/_http/user_master.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective, MatDialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public profile: boolean = false;
  public profileDetails: any;
  profilePhoto: any;
  subs: any;
  constructor(private router: Router, private commondataservice: CommonDataService, private authGuard: AuthGuard, public dialog: MatDialog, private userService: UserService,) { }

  ngOnInit(): void {
    this.subs = new Subscription()
    this.commondataservice.intializeCommonData();
    this.profileDetails = currentUser();
    this.subs.add(this.userService.getUser(this.profileDetails.user_id).subscribe({
      next: (value) => {
        // this.requestDetailsData.data = value.data;
        this.profilePhoto = value.data.file_path;
      }
    }))
    // this.commondataservice.roleData.subscribe({
    //   next: (data) => {
    //     this.profileDetails.role = data.find((item: any) => item.role_id == this.profileDetails.role_id)?.role_name ?? '';
    //   }
    // })
  }

  open() {
    this.profile = !this.profile
  }

  clickOutside(): void {
    this.profile = false;
  }

  resetPassword() {
    // const dialogConfig: MatDialogConfig = {
    //   maxWidth: '90vw',     // Adjust width to be responsive
    //   maxHeight: '90vh',    // Adjust height to be responsive
    //   height: 'auto',       // Allow auto height based on content
    //   width: 'auto',        // Allow auto width based on content
    //   data: [],             // Pass any necessary data to the dialog
    //   autoFocus: true,
    //   disableClose: true,
    //   panelClass: 'custom-dialog-container',
    // };

    // const dialogRef = this.dialog.open(ResetPasswordComponent, dialogConfig);
    this.router.navigate(['/auth/reset-password'])
  }

  logOut() {
    this.authGuard.resetGuard();
    new EncryptedStorage().clearAll();
    this.router.navigate(['/auth/login'])
  }

  redirectToAccount() {
    this.router.navigate(['/profile-master'])
  }
  redirectToNgoAccount() {
    this.router.navigate(['/ngo-profile-master'])
  }


}
