import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NotificationService } from '@shared/_http/notification.service';
import { Subscription } from 'rxjs';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  providers: [NotificationService],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  subs: any;
  countNotifcation: number;
  public notifications: boolean = false;

  notificationsData: any[]
  // [
  //   // { time: 'Just Now', message: 'What’s the project report update?', sender: 'Rick Novak', avatar: 'assets/images/avatar/10.jpg', type: 'primary' },
  //   // { time: '12:47 am', message: 'James created changelog page', sender: 'Susan Connor', avatar: 'assets/images/avatar/4.jpg', type: 'secondary' },
  //   // { time: '06:10 pm', message: 'Polly edited Contact page', sender: 'Roger Lum', avatar: 'assets/images/avatar/1.jpg', type: 'tertiary' },  
  //   // { time: '06:10 pm', message: 'Polly edited changelog page', sender: 'Susan Lum', avatar: 'assets/images/avatar/1.jpg', type: 'secondary' },  
  //   // { time: '06:10 pm', message: 'Polly edited report page', sender: 'Roger Lum', avatar: 'assets/images/avatar/1.jpg', type: 'tertiary' },  
  // ];
  constructor(private notificationService: NotificationService, public dialog: MatDialog, private elRef: ElementRef) {

  }
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
        console.log('value = ', value);
        this.notificationsData = value.data;
        this.countNotifcation = this.notificationsData?.length;
        // Reverse the notifications array
        const reversedNotifications = [...this.notificationsData].reverse();

        // Get the latest 3 notifications
        const latestThreeNotifications = reversedNotifications.slice(0, 3);
        this.notificationsData = latestThreeNotifications;
      }
    }))
  }

  notification() {
    this.notifications = !this.notifications
  }

  getNotificationClass(notification: any): string {
    return `b-l-${notification.type}`;
  }

  clickOutside(): void {
    this.notifications = false;
  }
  // Auto close modal
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = this.elRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.notifications = false;
    }
  }

  showAllNotification() {
    // Configure dialog settings
    const dialogConfig: MatDialogConfig = {
      width: '480px',
      maxHeight: '90vh',
      data: this.notificationsData || [],
      autoFocus: false,
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'notification-dialog-container',
      position: { top: '30px', right: '30px' }
    };

    // console.log('dialogConfig = ',dialogConfig);

    const dialogRef = this.dialog.open(AllNotificationsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getNotifications()
      }
    });
  }

}
