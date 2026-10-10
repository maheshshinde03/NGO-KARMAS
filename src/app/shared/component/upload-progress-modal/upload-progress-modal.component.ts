import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-upload-progress-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-progress-modal.component.html',
  styleUrl: './upload-progress-modal.component.scss'
})
export class UploadProgressModalComponent {
  @Input() totalFiles: number = 0;
  @Input() completedFiles: number = 0;
  @Input() errorCount: number = 0;
  @Input() errorFiles: { file: File, error: any }[] = []; // Add Error Files
  @Input() isUploading: boolean = true; // To control progress display
  
  constructor(public activeModal: NgbActiveModal) {}

  // Method to handle the OK button action
  onOk() {
    this.activeModal.close('OK');
  }

  // Method to handle the Cancel button action
  onCancel() {
    this.activeModal.dismiss('Cancel');
  }

  // To get the progress percentage
  get progressPercentage(): number {
    return this.totalFiles ? (this.completedFiles / this.totalFiles) * 100 : 0;
  }
}
