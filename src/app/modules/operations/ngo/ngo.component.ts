import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGODetailsData, requestStatusCardNgo } from '@shared/configs/ngo-master-config';
import { RequestsDetailsData, requestStatusCard } from '@shared/configs/requests-config';
import { RowData } from '@shared/models/table';
import { ExcelService } from '@shared/services/excel-export.service';
import { LoaderService } from '@shared/services/loader.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrl: './ngo.component.scss'
})
export class NgoComponent {
  ngoDetailsData: RowData = NGODetailsData;
  requestStatusCard: any[] = requestStatusCardNgo;
  subs: any;

  constructor(
    private router: Router,
    private ngoMasterservice: NgoControllerService,
    private excelservice: ExcelService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllNgo();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllNgo() {
    this.loader.showLoader();
    this.subs.add(this.ngoMasterservice.getAllNgo().subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.ngoDetailsData.data = value.data;
      }, error: (err) => {
        this.loader.hideLoader();
      }
    }))

    // this.subs.add(this.ngoMasterservice.getNgoRequestDashboardDataGetNgoCount(currentUser().ngo_id).subscribe({
    this.subs.add(this.ngoMasterservice.getNgoRequestDashboardDataGetNgoCount(null).subscribe({
      next: (value) => {
        // this.recentRequestAllForNgo = value?.data;
        const data = value?.data || value; // adjust based on your API shape

        this.requestStatusCard = this.requestStatusCard.map(card => ({
          ...card,
          number: Number(data[card.key] ?? 0)
        }));
      }, error: () => {
      }
    }));
  }


  handleCreateAction() {
    this.router.navigateByUrl("/ngo/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.ngoMasterservice.deleteNgo(event).subscribe({
      next: (value) => {
        this.getAllNgo()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/ngo/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/ngo/view/${event}`)
  }

  handleCardClickAction(event: any) {

  }

  handleExportAction(): void {
    this.excelservice.exportAsExcelFile(this.ngoDetailsData.data, "ngo_list", this.ngoDetailsData.excelKeys);
  }

  handleUnlockAction(event: any) {
    const formData = {
      ngo_id: event, // or event.id depending on your API
      is_blacklist: 0,
      blacklist_reason: ''
    };
    this.subs.add(
      this.ngoMasterservice.blockNgoById(formData).subscribe({
        next: () => {
          Swal.fire('Success', 'NGO unblacklisted successfully', 'success');
          this.getAllNgo();
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
          ngo_id: event, // or event.id depending on your API
          is_blacklist: 1,
          blacklist_reason: result.value
        };

        this.subs.add(
          this.ngoMasterservice.blockNgoById(formData).subscribe({
            next: () => {
              Swal.fire('Success', 'NGO blacklisted successfully', 'success');
              this.getAllNgo();
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
