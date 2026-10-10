import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import * as Data from '@shared/data/tasks/task-list';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationService } from '@shared/_http/notification.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-all-notifications',
  standalone: true,
  imports: [CommonModule, FeathericonComponent],
  providers: [NotificationService],
  templateUrl: './all-notifications.component.html',
  styleUrl: './all-notifications.component.scss'
})
export class AllNotificationsComponent {
  @Input() selectedheading_id: number;
  @Input() selectedTagId: number;
  public taskData = Data.TaskData;
  public tagData = Data.TagData;
  public gettaskData: Data.Tasklist;
  subs: any;
  notificationsData: any[] = [];
  unreadCount = 0;
  constructor(public dialogRef: MatDialogRef<AllNotificationsComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private notificationService: NotificationService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.subs = new Subscription();
    this.initialization()
  }

  initialization() {
    this.getNotifications();
  }

  getNotifications() {
    this.subs.add(this.notificationService.getAllUnreadNGONotification().subscribe({
      next: (value) => {
        this.notificationsData = value.data;
        this.updateUnreadCount();
      }
    }))
  }
  updateUnreadCount() {
    if (this.notificationsData) {
      // Assuming notificationsData is an array of notification objects
      this.unreadCount = this.notificationsData.filter(notification => !notification.is_read).length;
    } else {
      this.unreadCount = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = changes['selectedheading_id']?.currentValue;
    this.taskData.map((data) => {
      if (data.title_id === id) {
        this.gettaskData = data;
      }
    })

    let tagId = changes['selectedTagId']?.currentValue;
    this.tagData.map((data) => {
      if (data.title_id === tagId) {
        this.gettaskData = data
      }
    })
  }

  // Method to close the dialog without passing any data
  onCancel(): void {
    this.dialogRef.close();
  }
  readNotification(id: number) {
    let data = {
      is_read: 1
    }
    this.subs.add(this.notificationService.readNotificationByID(id, data).subscribe({
      next: (value) => {
        console.log('notificationService = ', value);
        this.getNotifications();
        // this.dialogRef.close();

        // this.notificationsData = value.data;
        // this.StateDetailsData.data = value.data
      }
    }))
  }
  readAllNotification() {
    this.subs.add(this.notificationService.readAllNotification().subscribe({
      next: (value) => {
        console.log('notificationService = ', value);
        this.getNotifications();
        // this.dialogRef.close();

        // this.notificationsData = value.data;
        // this.StateDetailsData.data = value.data
      }
    }))
  }

  sanitizeImage(url: string): SafeUrl {
    // return this.sanitizer.bypassSecurityTrustUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

