import { AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TotalClients, NewProject } from '../../../shared/data/dashboard/default/default-charts';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../feathericon/feathericon.component';
import { IFormStructure } from '@shared/models/form';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PassengersService } from '@shared/_http/passengers.service';
import { ToastService } from '@shared/services/toast.service';
import { CommonDataService } from '@shared/services/common.service';
import { CrewService } from '@shared/_http/crew.service';
import { LoaderService } from '@shared/services/loader.service';
import { NoRecordFoundComponent } from '../no-record-found/no-record-found.component';
import { ManifestReviewComponent } from './manifest-review/manifest-review.component';
import { ManifestGraphComponent } from './manifest-graph/manifest-graph.component';
import { ManifestViewTableComponent } from './manifest-view-table/manifest-view-table.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { globalStatus, globalStatusIDS } from '@shared/configs/status-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { currentShip } from '@shared/utils/current-ship';
import { BlockStatusNotificationService } from '@shared/services/blockStatusNotificationService';
import { PermissionsService } from '@shared/services/PermissionsService';
import { PermissionsActions } from '@shared/constants/permissionsActions.constant';

@Component({
  selector: 'app-manifest-details',
  standalone: true,
  imports: [CommonModule, ManifestReviewComponent, ManifestGraphComponent, FeathericonComponent, NoRecordFoundComponent, ManifestViewTableComponent, FeathericonComponent],
  providers: [PassengersService, CrewService],
  templateUrl: './manifest-details.component.html',
  styleUrl: './manifest-details.component.scss'
})
export class ManifestDetailsComponent implements OnInit, AfterViewInit {

  @Input() routeId: any;
  @Input() isAdmin: boolean;
  @Input() isPassenger = true;
  @Input() jobStatus: any;
  @Input() drsStatus: any;

  subs: any;
  routeName: any;
  passengerDetails: any[] = [];
  passengerData: any;
  isDataAvailable: boolean = false;
  isPmsSend: boolean = false;
  selectedShip:any;
  canUpload:boolean=false;
  canSendToPMS:boolean=false;
  pageId: number | null = null; // Nullable to handle cases where pageId is not set
  // Define statusLookup at the class level
  statusLookup: { [statusName: string]: { id: number, name: string } } = {};

  constructor(private passengersService: PassengersService, private activatedroute: ActivatedRoute, private toastService: ToastService, private commondataservice: CommonDataService, private crewService: CrewService, private loaderService: LoaderService, private modalService: NgbModal, private router: Router,private blockStatusNotificationService:BlockStatusNotificationService,private permissionsService:PermissionsService) { }
  ngOnInit(): void {
    this.subs = new Subscription()
    this.selectedShip = currentShip();
    this.activatedroute.data.subscribe(data => {
      this.pageId = data['pageId']; // Retrieve pageId from route data
      if (this.pageId) {
        // Check permissions based on the retrieved pageId
        this.canUpload = this.permissionsService.hasPermission(this.pageId, PermissionsActions.UPLOAD.name);
        this.canSendToPMS = this.permissionsService.hasPermission(this.pageId, PermissionsActions.SEND_TO_PMS.name);
      }
    })

    // this.TrackingFormStructureStructure = JSON.parse(JSON.stringify(TrackingFormStructure));
    this.routeName = 'create';

    // Inside your TypeScript file, before using it
    // Initialize statusLookup here
    globalStatus.forEach(status => {
      this.statusLookup[status.name] = { id: status.id, name: status.name };
    });


    this.activatedroute.paramMap.subscribe(params => {
      if (params.get('id'))
        this.routeId = params.get('id');
    });
    this.initialization()

  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      if (this.isPassenger) {
        this.getPaasengerDataByPortCall()
      } else {
        this.getCrewDataByPortCall()
      }
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getPaasengerDataByPortCall() {
    this.loaderService.showLoader()
    this.subs.add(this.passengersService.getAllPassengersDetails(this.routeId).subscribe({
      next: (value) => {
        this.loaderService.hideLoader();
        if (value.data?.total_passenger > 0) {
          this.isDataAvailable = true;
        }
        this.passengerData = value.data;
        this.passengerDetails = this.mapDataToFormattedObjects(value.data);
      },
      error: (err) => {
        console.log('err = ', err);
        this.isDataAvailable = false;
        this.passengerData = {
          disembark_status_count: 0,
          embark_status_count: 0,
          total_passenger: 0,
          transit_status_count: 0,
          voyage_registration_id: 0
        }
        this.passengerDetails = this.mapDataToFormattedObjects(null);
        this.loaderService.hideLoader();
        // this.toastService.open(message, 'error');
      }
    }))
  }

  getCrewDataByPortCall() {
    this.loaderService.showLoader()
    this.subs.add(this.crewService.getAllCrewDetails(this.routeId).subscribe({
      next: (value) => {
        this.passengerData = value.data;
        if (value.data?.total_crew > 0) {
          this.isDataAvailable = true;
        }
        this.passengerDetails = this.mapDataToFormattedObjects(value.data);
        this.loaderService.hideLoader();
      }, error: (err) => {
        console.log('err = ', err);
        this.isDataAvailable = false;
        this.passengerData = {
          disembark_status_count: 0,
          embark_status_count: 0,
          total_passenger: 0,
          transit_status_count: 0,
          voyage_registration_id: 0
        }
        this.passengerDetails = this.mapDataToFormattedObjects(null);
        this.loaderService.hideLoader();
        // this.toastService.open(message, 'error');
      }
    }))
  }

  initialization(): void {
    this.isPmsSend = false;
    // this.TrackingFormStructureStructure.forEach((ele, index) => {
    //   if (ele.type == 'select')
    //     this.setOptionValues(ele)
    //   if (this.routeName == 'view')
    //     ele.disable = true
    // })
  }

  setOptionValues(ele: any) {
    // switch (ele.listName) {
    //   case "ship-state":
    //     this.shipstateservice.getAllShipState().subscribe({
    //       next: (value) => {
    //         ele.listData = value.data
    //       }
    //     })
    //     break
    // }
  }

  handleSubmit(event: any) {
    // let formData = JSON.parse(JSON.stringify(event["formValue"]))
    // formData.voyage_registration_id = this.routeId
    // switch (this.routeName) {
    //   case 'create':
    //     this.subs.add(this.trackingservice.createTracking(formData).subscribe({
    //       next: (value) => {
    //         const message = responseMessages.codes.find(item => item.code == value.message)?.message ?? '';
    //         this.toastService.open(message, 'success');
    //         this.getTracking()
    //       },
    //       error: (err) => {
    //         const message = responseMessages.codes.find(item => item.code == err.message)?.message ?? 'Something went to wrong!';
    //         this.toastService.open(message, 'error');
    //       }
    //     }))
    //     break;
    //   case 'edit':
    //     // this.subs.add(this.trackingservice.updateServiceType(formData, this.routeId).subscribe({
    //     //   next: (value) => {
    //     //     const message = responseMessages.codes.find(item => item.code == value.message)?.message ?? '';
    //     //     this.toastService.open(message, 'success');
    //     //     this.router.navigateByUrl("/tracking")
    //     //   },
    //     //   error: (err) => {
    //     //     const message = responseMessages.codes.find(item => item.code == err.message)?.message ?? 'Something went to wrong!';
    //     //     this.toastService.open(message, 'error');
    //     //   }
    //     // }))
    //     break;

    // }
  }

  mapDataToFormattedObjects(data: any) {
    // Define the mapping of keys to properties
    let mappings
    if (this.isPassenger) {
      mappings = [
        { key: 'total_passenger', objectName: 'Total Passenger', statusShow: 'Total', class: 'tertiary' },
        { key: 'embark_status_count', objectName: 'Embark Status Count', statusShow: 'Embark', class: 'primary' },
        { key: 'disembark_status_count', objectName: 'Disembark Status Count', statusShow: 'Disembark', class: 'danger' },
        { key: 'transit_status_count', objectName: 'Transit Status Count', statusShow: 'Transit', class: 'primary' },
        { key: 'no_show_status_count', objectName: 'No-Show Status Count', statusShow: 'No Show', class: 'primary' },
        { key: 'image_file_uploaded', objectName: 'Photo uploaded', statusShow: 'Uploaded', class: 'primary' },
        { key: 'image_file_not_uploaded', objectName: 'Photo not uploaded', statusShow: 'Not Upload', class: 'danger' },
        // { key: 'pms_status_count', objectName: 'PMS Count', statusShow: 'PMS', class: 'primary' }
      ];
    } else {
      mappings = [
        { key: 'total_crew', objectName: 'Total crew', statusShow: 'Total', class: 'tertiary' },
        { key: 'embark_status_count', objectName: 'Embark Status Count', statusShow: 'Embark', class: 'primary' },
        { key: 'disembark_status_count', objectName: 'Disembark Status Count', statusShow: 'Disembark', class: 'danger' },
        { key: 'transit_status_count', objectName: 'Transit Status Count', statusShow: 'Transit', class: 'primary' },
        { key: 'no_show_status_count', objectName: 'No Show Status Count', statusShow: 'No Show', class: 'primary' },
        { key: 'image_file_uploaded', objectName: 'Photo uploaded', statusShow: 'Uploaded', class: 'primary' },
        { key: 'image_file_not_uploaded', objectName: 'Photo not uploaded', statusShow: 'Not Upload', class: 'danger' },
        // { key: 'pms_status_count', objectName: 'PMS Count', statusShow: 'PMS', class: 'primary' }
      ];
    }


    if (this.isAdmin) {
      mappings.push({ key: 'pms_upload', objectName: 'PMS uploaded', statusShow: 'PMS Upload', class: 'primary' })
    }
    // Define common properties for each formatted object
    const commonProps = {
      img: 'assets/images/avatar/10.jpg',
    };

    let formattedData;
    if (data) {
      // Map data using Array.prototype.map() method
      formattedData = mappings.map(mapping => {
        const status = this.statusLookup[mapping.statusShow] || { id: null, name: mapping.statusShow };
        return {
          ...commonProps,
          objectName: mapping.objectName,
          total_length: parseInt(data[mapping.key], 10) || 0,
          statusShow: status.name,
          statusId: status.id,
          class: mapping.class
        };
      });
    } else {
      // Map data using Array.prototype.map() method
      formattedData = mappings.map(mapping => {
        const status = this.statusLookup[mapping.statusShow] || { id: null, name: mapping.statusShow };
        return {
          ...commonProps,
          objectName: mapping.objectName,
          total_length: 0,
          statusShow: status.name,
          statusId: status.id,
          class: mapping.class
        };
      });
    }

    return formattedData;
  }

  viewTable(manifestTableContent: TemplateRef<NgbModal>,isPmsSend = false) {
    this.isPmsSend = isPmsSend;
    const modalRef = this.modalService.open(manifestTableContent, { fullscreen: true });
  }

  FullScreenModal() {

  }

  uploadManifast() {
    if (this.isAdmin) {
      const navigationExtras: NavigationExtras = {
        state: {
          isAdmin: this.isAdmin,// Your data object
          isDataAvailable: this.isDataAvailable
        }
      };
      if (this.isPassenger) {
        this.router.navigateByUrl(`/passenger-manifest`, navigationExtras);
      } else {
        this.router.navigateByUrl(`/crew-manifest`, navigationExtras);
      }

    } else {
      if (globalStatusIDS.JOBID_OPEN == this.jobStatus || globalStatusIDS.DRS_COMPLETE == this.drsStatus) {
        this.blockStatusNotificationService.handleStatusNotification(this.jobStatus,globalStatusIDS.JOBID_OPEN,'7.0001');
        this.blockStatusNotificationService.handleStatusNotification(this.drsStatus,globalStatusIDS.DRS_COMPLETE,'7.0002');
      }
      else {
        if (this.isPassenger) {
          this.router.navigateByUrl(`/passenger-manifest`);
        } else {
          this.router.navigateByUrl(`/crew-manifest`);
        }
      }
    }
    // this.router.navigateByUrl(`/passenger-manifest`);
    // this.router.navigateByUrl(`/passenger-manifest/${this.routeId}`);
  }

}
