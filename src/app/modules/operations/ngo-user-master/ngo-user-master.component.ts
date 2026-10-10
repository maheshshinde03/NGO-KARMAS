import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { UserMasterControllerService } from '@shared/_http/user-master.service';
import { UserService } from '@shared/_http/user_master.service';
import { requestStatusCard } from '@shared/configs/requests-config';
import { UserMasterData, UserMasterNGOData, userMasterStatusCard } from '@shared/configs/user-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-user-master',
  templateUrl: './ngo-user-master.component.html',
  styleUrl: './ngo-user-master.component.scss'
})
export class NgoUserMasterComponent {

  userMasterDetailsData: RowData = UserMasterNGOData;
  subs: any;
  userMasterStatusCard: any[] = userMasterStatusCard;
  constructor(private router: Router, private cityservice: CityService, private userMasterService: UserService, private loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllUser();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllUser() {
    this.loader.showLoader();
    this.subs.add(this.userMasterService.getAllUserByNGOId().subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.userMasterDetailsData.data = value.data;
      }, error: () => {
        this.loader.hideLoader();
      }
    }));
    this.subs.add(
      this.userMasterService.getNgoRequestDashboardDataGetUserCount(currentUser().ngo_id).subscribe({
        next: (value) => {
          const data = value?.data || {};

          this.userMasterStatusCard = this.userMasterStatusCard.map(card => ({
            ...card,
            number: Number(data[card.key] ?? 0)
          }));

          this.loader.hideLoader();
        },
        error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }


  handleCreateAction() {
    this.router.navigateByUrl("ngo-user-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.userMasterService.deleteUser(event).subscribe({
      next: (value) => {
        this.getAllUser()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`ngo-user-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`ngo-user-master/view/${event}`)
  }

  handleCardClickAction(event: any) { }

  handleUnlockAction(event: any) {
    const formData = {
      user_id: event, // or event.id depending on your API
      is_blacklisted: 0,
      blacklist_reason: ''
    };
    this.subs.add(
      this.userMasterService.lockUser(event, formData).subscribe({
        next: () => {
          Swal.fire('Success', 'User unblacklisted successfully', 'success');
          this.getAllUser();
        },
        error: () => {
          Swal.fire('Error', 'Something went wrong!', 'error');
        }
      })
    );
  }
  handlelockAction(event: any) {
    Swal.fire({
      title: 'Blacklist User',
      text: 'Please provide a reason for blacklisting this user',
      input: 'textarea',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Reason is required!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
          user_id: event, // or event.id depending on your API
          is_blacklisted: 1,
          blacklist_reason: result.value
        };

        this.subs.add(
          this.userMasterService.lockUser(event, formData).subscribe({
            next: () => {
              Swal.fire('Success', 'User blacklisted successfully', 'success');
              this.getAllUser();
            },
            error: () => {
              Swal.fire('Error', 'Something went wrong!', 'error');
            }
          })
        );
      }
    });
  }
}

