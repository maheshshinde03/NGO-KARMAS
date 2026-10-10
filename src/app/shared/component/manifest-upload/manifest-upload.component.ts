import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { CommonModule } from '@angular/common';
import { IFormStructure, IUploadStructure } from '@shared/models/form';
import * as XLSX from 'xlsx';
import { FormComponent } from '../form/form.component';
import { PassengersService } from '@shared/_http/passengers.service';
import { CrewService } from '@shared/_http/crew.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@shared/services/toast.service';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';
import { ExcelService } from '@shared/services/excel-export.service';
import { EncryptionAPILayer } from '@shared/utils/encryption-api';

@Component({
  selector: 'app-manifest-upload',
  standalone: true,
  imports: [CommonModule,FormComponent,UploadFileComponent],
  providers: [PassengersService, CrewService],
  templateUrl: './manifest-upload.component.html',
  styleUrl: './manifest-upload.component.scss'
})
export class ManifestUploadComponent {
  @Input() ManifestPassengeruploadDetailsFile!:IUploadStructure[];
  @Input() ManifestPassengerUploadFilesImages!:IFormStructure[];
  @Input() isAdmin:boolean;
  @Input() isPassenger : boolean;
  @Input() isDataAvailable:boolean;
  @Output() handleFileUploadParent: EventEmitter<File> = new EventEmitter<File>();
  @Output() handleFolderUploadParent: EventEmitter<File> = new EventEmitter<File>();
  @Output() selectValueChangeChange: EventEmitter<any> = new EventEmitter();
  manifestDetails: IUploadStructure | null = null; 
  checkIsDataAvailable:boolean=false;
  storeImagesFile:any;
  subs:any;

  constructor(private passengersService: PassengersService, private activatedroute: ActivatedRoute, private toastService: ToastService, private crewService: CrewService, private loaderService: LoaderService,private excelservice:ExcelService) { }
  
  ngOnInit(): void {
    this.subs = new Subscription()
    if (this.ManifestPassengeruploadDetailsFile.length > 0) {
      this.manifestDetails = this.ManifestPassengeruploadDetailsFile[0];
    }
  }

  ngAfterViewInit(): void {
    if (this.isDataAvailable){
      this.checkIsDataAvailable = true;
    }else{
      this.checkIsDataAvailable = false;
    }

  }

  handleFileUpload(event:any){
    // console.log('handleFileUpload = ',event)
    this.handleFileUploadParent.emit(event);
  }

  download(data:any){
    if(this.isPassenger){
      this.getPassengerDummyExcel();
    }else{
      this.getCrewDummyExcel();
    }
  }

  getPassengerDummyExcel(){
    this.loaderService.showLoader()
    this.subs.add(this.passengersService.getAllPassengersDummyExcel().subscribe({
      next: (value) => {
        console.log('err = ', value);
        this.excelservice.exportFromBase64(value.data.base64Data, `${value.data.file_name}`);
        this.loaderService.hideLoader();
      },
      error: (err) => {
        console.log('err = ', err);
        this.loaderService.hideLoader();
        // this.toastService.open(message, 'error');
      }
    }))
  }

  getCrewDummyExcel(){
    this.loaderService.showLoader();
    this.subs.add(this.crewService.getAllCrewDummyExcel().subscribe({
      next: (value) => {
        const newRes = new EncryptionAPILayer().decryptData(value.resBody)
        console.log('err = ', newRes);
        this.excelservice.exportFromBase64(newRes.data.base64Data, `${newRes.data.file_name}`);
        this.loaderService.hideLoader();
      },
      error: (err) => {
        console.log('err = ', err);
        this.loaderService.hideLoader();
        // this.toastService.open(message, 'error');
      }
    }))
  }

  handleSubmit(event:any){
    this.handleFolderUploadParent.emit(this.storeImagesFile);
  }

  handleFolderUpload(event:any){
    this.storeImagesFile = event
    // console.log('handleFileUpload = ',event)
  }

  handleSelectValueChange(event:any){
    this.selectValueChangeChange.emit(event);
  }
}
