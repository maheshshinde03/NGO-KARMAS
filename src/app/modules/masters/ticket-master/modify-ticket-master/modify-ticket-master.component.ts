import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotesMasterService } from '@shared/_http/quotes-master.service';
import { TicketMasterService } from '@shared/_http/ticket-master.service';
import { QuotesMasterData, QuotesMasterFormGroup } from '@shared/configs/quotes-master-config';
import { TicketMasterData, TicketMasterFormGroup } from '@shared/configs/ticket-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-ticket-master',
  templateUrl: './modify-ticket-master.component.html',
  styleUrl: './modify-ticket-master.component.scss'
})
export class ModifyTicketMasterComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  ticketsSearchGroupStructure!: IFormStructure[];
  ticketsMasterDetailsData: RowData = TicketMasterData;

  categoryList: any[] = [];
  documentTypeList: any[] = [];

  tabs = [
    { label: 'Tickets', key: 'tickets' },
    { label: 'Media', key: 'ticketsMedia' },
  ];

  selectedTab = 0;

  public active = 1;
  // public Quickdata = fileData.Quickdata;
  Quickdata = [
    { icon: 'fa-image', iconColor: 'info', folderName: 'Images', media_type: 'image' },
    { icon: 'fa-video', iconColor: 'danger', folderName: 'Videos', media_type: 'video' },
    // { icon: 'fa-music', iconColor: 'warning', folderName: 'Audio', media_type: 'audio' },
    // { icon: 'fa-file', iconColor: 'secondary', folderName: 'Documents', media_type: 'document' }
  ];

  selectedType: string = '';
  showModal = false;

  ngoMediaData = [
    // Replace this with backend response.data.ngo_media
  ];

  @ViewChild('requestMedia') requestMedia!: TemplateRef<any>;
  // @ViewChild('uploadModal') uploadModal: any;
  @ViewChild('previewModal') previewModal: any;
  @ViewChild('uploadModal') uploadModal!: TemplateRef<any>;
  ngoId = 1; // ✅ You already have this
  mediaList: any[] = [];
  filteredMedia: any[] = [];
  selectedMediaType: string = 'image';
  selectedMedia: any = null;
  isUploading = false;
  filesToUpload: any[] = [];
  mediaTypes = ['image', 'video', 'audio', 'document'];

  isDragOver = false;
  isUploadMediaWhileCreating = false;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private quotesMasterService: QuotesMasterService, private toastService: ToastService, private TicketModuleTypeMasterController: TicketMasterService, private modalService: NgbModal) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.ticketsSearchGroupStructure = JSON.parse(JSON.stringify(TicketMasterFormGroup));
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
      this.getRequest()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.ticketsSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "active_status":
        ele.listData = [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }]
        break
      case "gender":
        ele.listData = [{ 'value': 0, 'gender': 'Male' }, { 'value': 1, 'gender': 'Female' }]
        break
      // case "country":
      //   this.subs.add(this.countryservice.getAllCountry().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //  break
      // case "state":
      //   this.subs.add(this.stateservice.getAllState().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //   break
    }
  }

  getRequest() {
    this.subs.add(this.TicketModuleTypeMasterController.getTicket(this.routeId).subscribe({
      next: (value) => {
        this.ticketsMasterDetailsData.data = value.data
      }
    }));

    this.subs.add(this.TicketModuleTypeMasterController.getTicketMedia(this.routeId).subscribe({
      next: (value) => {
        debugger
        // this.ticketsMasterDetailsData.data = value.data
        if (value.data) {
          this.mediaList = value.data;
          this.filterByType(this.selectedMediaType);
        }
      }
    }))
  }

  downloadFile(url: string, fileName: string) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.TicketModuleTypeMasterController.createTicket(formData).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/ticket-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.TicketModuleTypeMasterController.updateTicket(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/ticket-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;

    }
  }

  uploadMedia() {
    if (!this.filesToUpload?.length) {
      this.toastService.open('Please select at least one file to upload.', 'warning');
      return;
    }

    this.isUploading = true;

    const token = localStorage.getItem('token') || ''; // or get it from AuthService

    if (this.routeName === 'create') {
      this.TicketModuleTypeMasterController.uploadTicketMedia(this.filesToUpload, this.routeId)
        .then(() => {
          this.isUploading = false;
          this.toastService.open('Media uploaded successfully!', 'success');
          this.modalService.dismissAll();
          this.filesToUpload = [];
          this.router.navigateByUrl("/requests");
        })
        .catch((error) => {
          console.error('Upload failed:', error);
          this.toastService.open('Failed to upload media. Please try again.', 'error');
          this.isUploading = false;
        });
    } else {
      this.TicketModuleTypeMasterController.uploadTicketMedia(this.filesToUpload, this.routeId)
        .then(() => {
          this.isUploading = false;
          this.toastService.open('Media uploaded successfully!', 'success');
          this.modalService.dismissAll();
          this.filesToUpload = []
          this.getRequest(); // refresh NGO details
        })
        .catch((error) => {
          console.error('Upload failed:', error);
          this.toastService.open('Failed to upload media. Please try again.', 'error');
          this.isUploading = false;
        });
    }

  }

  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filesToUpload.push({
          file,
          preview: e.target.result,  // Data URL
          progress: 0
        });
      };
      reader.readAsDataURL(file); // generates preview URL
    });
  }

  onDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    const files: File[] = Array.from(event.dataTransfer.files);
    this.onFileChange({ target: { files } });
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: any) {
    this.isDragOver = false;
  }

  // onDrop(event: any) {
  //   event.preventDefault();
  //   this.isDragOver = false;
  //   const files = Array.from(event.dataTransfer.files);
  //   this.onFileChange({ target: { files } });
  // }

  removeFile(index: number) {
    this.filesToUpload.splice(index, 1);
  }

  filterByType(type: string) {
    this.selectedMediaType = type;
    this.filteredMedia = this.mediaList.filter((m) => m.media_type === type);
  }

  openUploadModal() {
    this.modalService.open(this.uploadModal, { size: 'lg', centered: true });
  }

  openPreviewModal(media: any) {
    this.selectedMedia = media;
    this.modalService.open(this.previewModal, { size: 'lg', centered: true });
  }

  removeMedia(media: any, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this media?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut'
      }
    }).then((result) => {

      if (result.isConfirmed) {

        if (media?.request_media_id) {
          // If API required
          this.TicketModuleTypeMasterController.deleteTicketMedia(media.ticket_media_id).subscribe(() => {
            // Remove from array
            this.filteredMedia.splice(index, 1);

            // Success message
            Swal.fire({
              title: 'Deleted!',
              text: 'Your media has been deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });

          });
        } else {
          this.filteredMedia.splice(index, 1);

          // Success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Your media has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        }


      }

    });
  }

}



