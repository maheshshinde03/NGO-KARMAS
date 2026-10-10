import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { RequestsService } from '@shared/_http/requests.service';
import { NGORequestsDetailsData, NGORequestsDetailsDataUserId, NGORequestsDetailsORGData, requestNGOStatusCard, RequestsDetailsData, requestStatusCard } from '@shared/configs/requests-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-requests',
  templateUrl: './ngo-requests.component.html',
  styleUrl: './ngo-requests.component.scss'
})
export class NgoRequestsComponent {
  requestDetailsData: RowData = NGORequestsDetailsData;
  requestDetailsDataUserPerson: RowData = NGORequestsDetailsDataUserId;
  requestORGDetailsData: RowData = NGORequestsDetailsORGData;

  subs: any;
  requestStatusCard: any[] = requestNGOStatusCard;
  ngoId: any;
  selectedTab = 0;
  constructor(private router: Router, private cityservice: CityService, private requestsService: RequestsService, private loader: LoaderService, private toastService: ToastService) { }

  tabs = [
    { label: 'Assignee Request', key: 'assign' },
    { label: 'Raise by Organization', key: 'organization' },
    // { label: 'Raise by Member', key: 'personal' },
    // Add more as needed
  ];

  ngOnInit(): void {
    this.subs = new Subscription()
    this.getRequestNgo();
    console.log('currentUser = ', currentUser());
    if (currentUser().role === 'NGO') {
      this.ngoId = currentUser().ngo_id;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getRequestNgo() {
    if (currentUser().role === 'NGO' || currentUser().role === 'NGO_USER') {
      this.ngoId = currentUser().ngo_id;
    }
    this.loader.showLoader();
    this.subs.add(this.requestsService.getAllrequestsForNGO(this.ngoId).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.requestDetailsData.data = value.data;
      }, error: (er) => {
        this.loader.hideLoader();
      }
    }))

    this.subs.add(this.requestsService.getAllrequestsForNGO_ORG(this.ngoId).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.requestORGDetailsData.data = value.data;
      }, error: (er) => {
        this.loader.hideLoader();
      }
    }))


    this.subs.add(this.requestsService.getAllrequestsForNGOGetByUserId(currentUser().user_id).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.requestDetailsDataUserPerson.data = value.data;
      }, error: (er) => {
        this.loader.hideLoader();
        this.requestDetailsDataUserPerson.data = [];
      }
    }))

    this.subs.add(
      this.requestsService
        .getNgoRequestDashboardDataGetRequestCount(currentUser().ngo_id)
        .subscribe({
          next: (value) => {
            const data = value?.data || {};

            // Update card numbers dynamically based on key
            this.requestStatusCard = this.requestStatusCard.map(card => ({
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
    this.router.navigateByUrl("/ngo-requests/create")
  }

  handleCreateActionV2() {
    this.router.navigateByUrl("/ngo-requests/self-create")
  }

  handleDeleteAction(event: any) {
    // console.log('currentUser().user_id = ',currentUser().user_id);
    if (event.created_by === currentUser().user_id) {
      this.subs.add(this.requestsService.deleterequests(event.RequestId).subscribe({
        next: (value) => {
          this.getRequestNgo()
        }
      }))
    } else {
      this.toastService.open('Only the creator of this request can delete it!', 'error');
    }

  }


  handleEditAction(event: any) {
    // this.router.navigateByUrl(`/ngo-requests/edit/${event}`)
  }

  handleEditFullDataAction(event: any) {
    console.log('event = ', event);
    console.log('currentUser().user_id = ', currentUser().user_id);
    console.log('event.created_by = ', event.created_by);
    if (event.status_id === 7 || event.created_by === currentUser().user_id) {
      this.router.navigateByUrl(`/ngo-requests/edit/${event.RequestId}`)
    } else {
      this.toastService.open('Need to first approve request!', 'error');
    }

  }

  handleEditFullDataActionV2(event: any) {
    console.log('event = ', event);
    if (event.status_id === 7) {
      this.router.navigateByUrl(`/ngo-requests/self-edit/${event.RequestId}`)
    } else {
      this.toastService.open('Need to first approve request!', 'error');
    }

  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/ngo-requests/view/${event}`)
  }

  handleViewActionV2(event: any) {
    this.router.navigateByUrl(`/ngo-requests/self-view/${event}`)
  }

  // Card click handling
  handleCardClickAction(event: any) {
    // this.shipmentsDetailsData.data = this.filterShipmentData.filter(data => data.hawb_state_name == event.name)
    // console.log('event = ',event);
    // if(event.key === 'total_invoices'){
    //   this.loadAllInvoiceForCustAndAdmin(null);
    // }
    // if(event.key === 'total_approved'){
    //   this.loadAllInvoiceForCustAndAdmin(1);
    // }
    // if(event.key === 'total_not_approved'){
    //   this.loadAllInvoiceForCustAndAdmin(0);
    // }
  }

  handleCheckAction(event: any) {
    const payload = {
      "RequestId": event.RequestId,
      "status_id": "7"
    }
    this.handleApproveReject(event, payload)
  }

  // handleCorssAction(event: any) {
  //   const payload = {
  //     "RequestId": event,
  //     "status_id": "12"
  //   }
  //   this.handleApproveReject(event, payload)
  // }

  handleCorssAction(event: any) {
    Swal.fire({
      title: 'Provide a Reason',
      input: 'textarea',
      inputLabel: 'Reason (required)',
      inputPlaceholder: 'Enter your reason here...',
      inputAttributes: {
        'aria-label': 'Enter your reason here'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Reason is required!';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const payload = {
          RequestId: event.RequestId,
          status_id: "8",
          Reason: result.value
        };

        this.handleApproveReject(event, payload);
      }
    });
  }

  handleApproveReject(data: any, payload: any) {
    this.loader.showLoader();
    this.subs.add(this.requestsService.approveAndRejectRequests(data.Request_Ngo_Id, payload).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.getRequestNgo()
      }, error: (err) => {
        this.loader.hideLoader();
        console.log('err', err);

        let errorMessage = 'Something went wrong!';

        try {
          if (typeof err.error === 'string') {
            // Try parsing only if it's a JSON string
            const parsed = JSON.parse(err.error);
            errorMessage = parsed.message ?? errorMessage;
          } else if (err.error?.message) {
            // Already JSON object
            errorMessage = err.error.message;
          }
        } catch (e) {
          // Parsing failed, fall back to default
          console.warn('Error parsing response:', e);
        }

        // Check your mapping
        const mappedMessage = responseMessages.codes.find(item => item.code == err.code)?.message ?? errorMessage;

        this.toastService.open(mappedMessage, 'error');
      }
    }))
  }

  handleRequestFileAction(event: any) {
    console.log('event = ', event);

    const payload = {
      is_document_required: 1
    }

    this.loader.showLoader();
    this.subs.add(this.requestsService.requestForDocuments(event.Request_Ngo_Id, payload).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.getRequestNgo()
      }, error: (err) => {
        this.loader.hideLoader();
        console.log('err', err);

        let errorMessage = 'Something went wrong!';
        // Check your mapping
        const mappedMessage = responseMessages.codes.find(item => item.code == err.code)?.message ?? errorMessage;

        this.toastService.open(mappedMessage, 'error');
      }
    }))
  }
}

