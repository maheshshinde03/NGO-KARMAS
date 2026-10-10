import { Location } from '@angular/common';
import { AfterViewInit, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { RequestsService } from '@shared/_http/requests.service';
import { StateService } from '@shared/_http/state.service';
import { NgoListData, RequestDetailsSearchGroup, RequestsDetailsData } from '@shared/configs/requests-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestNgoPopupComponent } from '../request-ngo-popup/request-ngo-popup.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { LoaderService } from '@shared/services/loader.service';
import { RequestsTypeService } from '@shared/_http/requestsType.service';
import { FormComponent } from '@shared/component/form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';
@Component({
  selector: 'app-modify-requests',
  templateUrl: './modify-requests.component.html',
  styleUrl: './modify-requests.component.scss'
})
export class ModifyRequestsComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  requestSearchGroupStructure!: IFormStructure[];
  requestDetailsData: RowData = RequestsDetailsData;
  ngoDetailsList: RowData = NgoListData;
  RequestId: any;
  @ViewChild(FormComponent) formComponent!: FormComponent;

  requestDocumentForm!: FormGroup;

  categoryList: any[] = [];
  documentTypeList: any[] = [];

  tabs = [
    { label: 'Request', key: 'ngoProfile' },
    { label: 'Media', key: 'requestMedia' },
    // { label: 'Documents Assign', key: 'requestDocuments' },
    { label: 'Documents', key: 'Documents' },
    // Add more as needed
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
  reqDocuments: any;
  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private cityservice: CityService,
    private toastService: ToastService,
    private countryservice: CountryService,
    private stateservice: StateService,
    private requestsService: RequestsService,
    public dialog: MatDialog,
    private ngoMasterservice: NgoControllerService,
    private ngoFieldService: NGOFieldService,
    private loader: LoaderService,
    private reuestTypeService: RequestsTypeService, private modalService: NgbModal, private fb: FormBuilder, private requestDocMasterController: RequestDocumentsMasterService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.requestSearchGroupStructure = JSON.parse(JSON.stringify(RequestDetailsSearchGroup));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initialization()
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getRequest();
      this.getAllNgoRequestWise();
      this.getDocumentsDataById()
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {

    this.requestDocumentForm = this.fb.group({
      documents: this.fb.array([this.createRow()])
    });
    this.getDocumentTypeList();
    this.requestSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'view') {
        ele.disable = true
        // List of element names to hide the control
        const hiddenControls = ['Story', 'Problem', 'Solution', 'MessageToSahayak', 'RejectRemark', 'NGO_Accept_NGO_Name'];

        // If the element's name is in the hiddenControls list, hide its control
        if (hiddenControls.includes(ele.name)) {
          ele.hiddenControl = false;
        }
      }
      if (this.routeName == 'edit') {
        // List of element names to hide the control
        const hiddenControls = ['Story', 'Problem', 'Solution', 'MessageToSahayak', 'RejectRemark'];

        // If the element's name is in the hiddenControls list, hide its control
        if (hiddenControls.includes(ele.name)) {
          ele.hiddenControl = false;
        }
      }
      if (ele.type == 'select')
        this.setOptionValues(ele)
    });

    this.loadNgoMaster();
  }

  loadNgoMaster() {

  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "ngo_field":
        this.subs.add(this.ngoFieldService.getAllNGOField().subscribe({
          next: (value) => {
            ele.listData = value.data;
            this.categoryList = value.data;
          }
        }))
        break
      case "requestTypeList":
        this.subs.add(this.reuestTypeService.getAllrequests().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break

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
    }
  }

  getRequest() {
    this.loader.showLoader();
    this.subs.add(this.requestsService.getByRequestId(this.routeId).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.requestDetailsData.data = value.data;
        if (this.requestDetailsData?.data?.Category) {
          this.requestDetailsData.data.Category = Number(this.requestDetailsData?.data?.Category);
        }
        if (this.requestDetailsData.data?.request_media) {
          this.mediaList = this.requestDetailsData.data.request_media;
          this.filterByType(this.selectedMediaType);
        }

        if (this.requestDetailsData.data?.request_type_name === "ANIMAL REQUEST") {
          this.setRequestHandle(true);
        } else {
          this.setRequestHandle(false);
        }

        // if (this.requestDetailsData.data?.status_id === 5) {
        //   this.ngoDetailsList.isassignKeyUnable = true;
        // }
        // if (this.requestDetailsData.data.status_id === 5 || this.requestDetailsData?.data?.status_id === 9) {
        //   this.ngoDetailsList.isassignKeyUnable = true;
        //   debugger
        // }

      }, error: (err) => {
        this.loader.hideLoader();
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]))
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.requestsService.createrequests(formData).subscribe({
          next: (value) => {
            console.log('value = ', value);
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.RequestId = value?.data?.RequestId ?? null
            // Show success swal
            Swal.fire({
              icon: 'success',
              title: 'Request Created',
              html: `
                <p class="mb-1">Your request has been created successfully.</p>
                <p class="fw-semibold text-primary mb-1">Now you need to upload media (photos or videos)</p>
                <p class="text-muted mb-0">
                  Uploading media is <strong>mandatory</strong> to complete this request. 
                  Please upload all required files before proceeding further.
                </p>
              `,
              confirmButtonText: 'Upload Media',
              showCancelButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(() => {
              this.openMediaPopup();
            });
            this.toastService.open(message, 'success');
            // this.router.navigateByUrl("/requests")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.requestsService.updaterequests(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/requests")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;

    }
  }

  openMediaPopup() {
    this.modalService.open(this.requestMedia, {
      size: 'xl',
      centered: true,
      backdrop: 'static',    // user cannot close by clicking outside
      keyboard: false
    });
  }

  openRequestNgoPopup(): void {
    const dialogRef = this.dialog.open(RequestNgoPopupComponent, {
      width: '80vw',
      height: '80vh',
      maxWidth: '80vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Selected NGO:', result);
      }
    });
  }

  getAllNgoRequestWise() {
    this.subs.add(this.ngoMasterservice.getAllNgoRequestWise(this.routeId).subscribe({
      next: (value) => {
        this.ngoDetailsList.data = value.data;
        // Check if any record has status_id === 7
        // TRUE if any item has status_id === 7 (null-safe)

        if (this.requestDetailsData?.data?.status_id === 5 || this.requestDetailsData?.data?.status_id === 6) {
          this.ngoDetailsList.isassignKeyUnable =
            this.ngoDetailsList.data.some(
              (item: any) => item?.status_id === 7
            );
        }

        // status_id that should ENABLE assign key (force false)
        const enableStatusIds = [8, 9, 10];

        // If any record has 9 or 10 → force FALSE
        if (enableStatusIds.includes(this.requestDetailsData.data.status_id)) {
          this.ngoDetailsList.isassignKeyUnable = true;
        }
        // this.filteredNgos = [...this.ngos];
        // this.ngoDetailsData.data = value.data;
      }, error: (err) => {
        this.ngoDetailsList.data = [];
      }
    }))
  }

  handleAssignAction(event: any) {
    const selectedNgo = event;
    console.log('selectedNgo = ', selectedNgo)
    const requestNgoList = [];
    requestNgoList.push(
      {
        ngo_id: selectedNgo.ngo_id,
        RequestId: this.routeId,
        Request_Ngo_Id: selectedNgo.Request_Ngo_Id,
        category_id: this.requestDetailsData?.data?.category_id,

      }
    );

    if (requestNgoList.length > 0) {
      const payload = {
        requestNgoList: requestNgoList
      }

      this.subs.add(this.ngoMasterservice.assignNgoToRequest(payload).subscribe({
        next: (value) => {
          const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
          this.toastService.open(message, 'success');
          this.getAllNgoRequestWise();
        },
        error: (err) => {
          const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
          this.toastService.open(message, 'error');
        }
      }))
    }
    // if (selectedNgo) {
    //   this.subs.add(this.ngoMasterservice.assignNgoToRequest(this.routeId).subscribe({
    //     next: (value) => {
    //       const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
    //       this.toastService.open(message, 'success');
    //       this.getAllNgoRequestWise();
    //     },
    //     error: (err) => {
    //       const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
    //       this.toastService.open(message, 'error');
    //     }
    //   }))
    // }
  }

  handleFileUpload(event: any): void {
    console.log('event. = ', event);
    if (event?.fieldName === 'upi_file') {

      // this.data.bankDetailsData.data.upi_file_name = event.imgName;
      // // this.data.bankDetailsData.data.logo_path = null;
      // this.data.bankDetailsData.data.upi_file = event.base64String;

      // this.data.bankDetailsData.data.upi_image_path_name = event.imgName;
      // this.data.bankDetailsData.data.upi_image_path = null;
      // this.data.bankDetailsData.data.upi_image_path_file = event.base64String;
    }
  }


  handleSelectValueChange(event: any) {
    console.log('event = ', event);
    if (event.controlName === "request_type_id") {
      if (event.request_type_name === "ANIMAL REQUEST") {
        this.setRequestHandle(true);
      } else {
        this.setRequestHandle(false);
      }
    }
    // this.cdr.detectChanges()
  }

  setRequestHandle(isAnimalReq: boolean) {
    this.requestSearchGroupStructure.forEach((ele, index) => {
      if (isAnimalReq) {
        // List of element names to hide the control
        const hiddenControls = ['Age', 'Gender'];

        // If the element's name is in the hiddenControls list, hide its control
        if (hiddenControls.includes(ele.name)) {
          ele.hiddenControl = true;
          ele.required = false;
        }
        this.formComponent.updateValidator(ele.name, false);
      } else {
        // List of element names to hide the control
        const hiddenControls = ['Age', 'Gender'];

        // If the element's name is in the hiddenControls list, hide its control
        if (hiddenControls.includes(ele.name)) {
          ele.hiddenControl = false;
        }
        if (ele.name === 'Gender') {
          ele.required = true;
        }
        this.formComponent.updateValidator(ele.name, false);
      }
    });
  }

  filterMedia(type: string) {
    this.selectedMediaType = type.toLowerCase();
    if (type.toLowerCase() === 'videos') {
      this.filteredMedia = this.requestDetailsData.data.request_media.filter((m: any) => m.media_type === 'video');
    } else if (type.toLowerCase() === 'music') {
      this.filteredMedia = this.requestDetailsData.data.request_media.filter((m: any) => m.media_type === 'audio');
    } else if (type.toLowerCase() === 'images' || type.toLowerCase() === 'document') {
      this.filteredMedia = this.requestDetailsData.data.request_media.filter((m: any) => m.media_type === 'image');
    } else {
      this.filteredMedia = [];
    }
  }

  // openModal(media: any) {
  //   this.selectedMedia = media;
  //   this.modalService.open(this.mediaModal, { centered: true, size: 'lg' });
  // }

  // closeModal() {
  //   this.showModal = false;
  //   this.selectedMedia = null;
  // }

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

  // onFileChange(event: any) {
  //   this.filesToUpload = Array.from(event.target.files);
  // }

  uploadMedia() {
    if (!this.filesToUpload?.length) {
      this.toastService.open('Please select at least one file to upload.', 'warning');
      return;
    }

    this.isUploading = true;

    const token = localStorage.getItem('token') || ''; // or get it from AuthService

    if (this.routeName === 'create') {
      this.requestsService.uploadRequestMedia(this.filesToUpload, this.RequestId)
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
      this.requestsService.uploadRequestMedia(this.filesToUpload, this.routeId)
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


  handleApproveReject(payload: any) {
    this.loader.showLoader();
    this.subs.add(this.requestsService.updaterequests(payload, this.routeId).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Request updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
        this.getRequest();
        this.getAllNgoRequestWise();
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

  approve() {
    const payload = {
      "RequestId": this.requestDetailsData.data.RequestId,
      "status_id": "5"
    }
    this.handleApproveReject(payload)
  }

  reject() {
    Swal.fire({
      title: 'Are Your Sure Want to Be Reject, Provide a Reason',
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
          RequestId: this.requestDetailsData.data.RequestId,
          status_id: "8",
          RejectRemark: result.value
        };

        this.handleApproveReject(payload);
      }
    });
  }

  shouldShowApproveReject(): boolean {
    const statusId = this.requestDetailsData?.data?.status_id;
    const hiddenStatusIds = [5, 6, 7, 8];

    return !hiddenStatusIds.includes(statusId);
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
          this.requestsService.deleteRequestsMedia(media.request_media_id).subscribe(() => {
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



  createRow(): FormGroup {
    return this.fb.group({
      categrory_document_id: [null],
      ngo_id: [this.routeId], // dynamic if needed
      category_id: ['', Validators.required],
      document_type_id: ['', Validators.required],
      is_mandatory: [1],
      created_by: [1]
    });
  }

  get documents(): FormArray {
    return this.requestDocumentForm.get('documents') as FormArray;
  }

  addRow() {
    this.documents.push(this.createRow());
  }

  removeRow(index: number) {
    this.documents.removeAt(index);
  }

  submitForm() {
    if (this.requestDocumentForm.invalid) {
      this.requestDocumentForm.markAllAsTouched();
      return;
    }

    const payload = this.requestDocumentForm.value.documents;

    payload.forEach((item: any) => {
      // this.http.post(
      //   'http://localhost:3000/api/v1/ngo_request_document_category/create',
      //   item,
      //   {
      //     headers: {
      //       'x-access-token': 'YOUR_TOKEN'
      //     }
      //   }
      // ).subscribe(res => {
      //   console.log('Created:', res);
      // });

      if (item.categrory_document_id) {
        // 🔵 UPDATE API
        this.requestsService
          .updateNgoRequestDocumentCategory(item, item.categrory_document_id)
          .subscribe(res => {
            console.log('Updated:', res);
          });

      } else {
        // 🟢 CREATE API
        this.requestsService
          .ngoRequestDocumentCategory(item)
          .subscribe(res => {
            console.log('Created:', res);
          });
      }

      // this.requestsService.ngoRequestDocumentCategory(item).subscribe((res) => {
      //   console.log('Created:', res);
      // });
    });

    console.log('Final Payload:', payload);
  }


  // getCategoryList() {

  // }


  getDocumentTypeList() {
    this.subs.add(this.requestDocMasterController.getAllRequestDocumentsMaster().subscribe({
      next: (value) => {
        this.documentTypeList = value.data;
      }
    }))
  }


  getDocumentsDataById() {
    this.loader.showLoader();
    this.subs.add(this.ngoMasterservice.getAllDocumentsRequestWise(this.routeId).subscribe({
      next: (value) => {
        console.log('value.data = ', value.data);
        this.reqDocuments = value.data;
        // this.ngoDetailsList.data = value.data;
        // this.filteredNgos = [...this.ngos];
        // this.ngoDetailsData.data = value.data;
        this.loader.hideLoader();
      }, error: (err) => {
        this.reqDocuments = [];
        this.loader.hideLoader();

      }
    }))
    // this.loader.showLoader();
    // this.subs.add(this.requestsService.requestDocumentById(this.routeId).subscribe({
    //   next: (value: any) => {
    //     this.loader.hideLoader();

    //     if (value?.data) {

    //       console.log(value.data);

    //       // // Clear existing rows
    //       // this.documents.clear();

    //       // // If API returns single object
    //       // const data = Array.isArray(value.data) ? value.data : [value.data];

    //       // data.forEach((item: any) => {
    //       //   this.documents.push(
    //       //     this.fb.group({
    //       //       categrory_document_id: [data?.categrory_document_id || null],
    //       //       ngo_id: [item.ngo_id],
    //       //       category_id: [item.category_id, Validators.required],
    //       //       document_type_id: [item.document_type_id, Validators.required],
    //       //       is_mandatory: [item.is_mandatory],
    //       //       created_by: [item.created_by]
    //       //     })
    //       //   );
    //       // });
    //     }
    //   }, error: (err: any) => {
    //     this.loader.hideLoader();
    //   }
    // }))
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

}



