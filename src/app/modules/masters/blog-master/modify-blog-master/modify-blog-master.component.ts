import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { ScoreCategoryService } from '@shared/_http/score-category.service';
import { LoaderService } from '@shared/services/loader.service'
import { BlogMasterDetailsData, BlogMasterFormStructure } from '@shared/configs/blog-master-config';
import { BlogsMasterService } from '@shared/_http/blog-master.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-blog-master',
  templateUrl: './modify-blog-master.component.html',
  styleUrl: './modify-blog-master.component.scss'
})
export class ModifyBlogMasterComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  blogMasterFormStructure: IFormStructure[] = [];
  blogMasterDetailsData: RowData = BlogMasterDetailsData;

  @ViewChild('requestMedia') requestMedia!: TemplateRef<any>;
  // @ViewChild('uploadModal') uploadModal: any;
  @ViewChild('previewModal') previewModal: any;
  @ViewChild('uploadModal') uploadModal!: TemplateRef<any>;


  tabs = [
    { label: 'Blog', key: 'ngoProfile' },
    { label: 'Blog Media', key: 'requestMedia' },
    // Add more as needed
  ];

  selectedTab = 0;

  Quickdata = [
    { icon: 'fa-image', iconColor: 'info', folderName: 'Images', media_type: 'image' },
    { icon: 'fa-video', iconColor: 'danger', folderName: 'Videos', media_type: 'video' },
    // { icon: 'fa-music', iconColor: 'warning', folderName: 'Audio', media_type: 'audio' },
    // { icon: 'fa-file', iconColor: 'secondary', folderName: 'Documents', media_type: 'document' }
  ];

  mediaList: any[] = [];
  filteredMedia: any[] = [];
  selectedMediaType: string = 'image';
  selectedMedia: any = null;
  isUploading = false;
  filesToUpload: any[] = [];
  mediaTypes = ['image', 'video', 'audio', 'document'];

  isDragOver = false;
  isUploadMediaWhileCreating = false;

  ngoId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private blogMasterService: BlogsMasterService,
    private scoreCategoryService: ScoreCategoryService,
    public loader: LoaderService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.blogMasterFormStructure = JSON.parse(JSON.stringify(BlogMasterFormStructure));
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getBlogDetails();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Disable form if in view mode
   */
  initializeForm(): void {
    this.blogMasterFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
      if (control.type === 'select') {
        this.setOptionValues(control);
      }
    });
  }

  /**
 * Set dropdown options dynamically
 * @param control form control
 */
  setOptionValues(control: IFormStructure): void {
    if (control.listName === 'score_category_list') {
      this.subs.add(
        this.scoreCategoryService.getAllScoreCategory().subscribe({
          next: (res) => {
            control.listData = res.data;
          }
        })
      );
    }
  }

  /**
   * Fetch bonus by ID for edit/view
   */
  getBlogDetails(): void {
    this.loader.showLoader();
    this.subs.add(
      this.blogMasterService.getBlogById(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.blogMasterDetailsData.data = res.data;

          if (this.blogMasterDetailsData.data?.media) {
            this.mediaList = this.blogMasterDetailsData.data.media;
            this.filterByType(this.selectedMediaType);
          }

        }, error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handle form submission for create and edit
   * @param event emitted data from app-form
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.blogMasterService.createBlog(formData).subscribe({
            next: (res) => {
              const message = responseMessages.codes.find(item => item.code == res.error_message)?.message ?? 'Bonus created successfully';
              this.toastService.open(message, 'success');
              // this.router.navigateByUrl('/blogs');
              // this.ngoId = res?.data?.blog_id ?? null;
              this.ngoId = res?.data?.blog_id ?? 16
              // Show success swal
              Swal.fire({
                icon: 'success',
                title: 'Blog Created',
                html: `
                              <p class="mb-1">Your blog has been created successfully.</p>
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
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
      case 'edit':
        this.subs.add(
          this.blogMasterService.updateBlog(formData, this.routeId).subscribe({
            next: (res) => {
              const message = responseMessages.codes.find(item => item.code == res.error_message)?.message ?? 'Bonus updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/blogs');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
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
      this.blogMasterService.uploadBlogMedia(this.filesToUpload, this.ngoId)
        .then(() => {
          this.isUploading = false;
          this.toastService.open('Media uploaded successfully!', 'success');
          this.modalService.dismissAll();
          this.filesToUpload = [];
          this.router.navigateByUrl("/blogs");
        })
        .catch((error) => {
          console.error('Upload failed:', error);
          this.toastService.open('Failed to upload media. Please try again.', 'error');
          this.isUploading = false;
        });
    } else {
      this.blogMasterService.uploadBlogMedia(this.filesToUpload, this.routeId)
        .then(() => {
          this.isUploading = false;
          this.toastService.open('Media uploaded successfully!', 'success');
          this.modalService.dismissAll();
          this.filesToUpload = []
          this.getBlogDetails(); // refresh NGO details
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

}
