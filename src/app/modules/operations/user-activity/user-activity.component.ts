import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { UserActivityService } from '@shared/_http/user-activity.service';
import { UserActivityDetailsData } from '@shared/configs/user-activity-config';
import { RowData } from '@shared/models/table';
import { userCard } from '@shared/data/user/users-card';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrl: './user-activity.component.scss'
})
export class UserActivityComponent {
  userActivityDetailsData: RowData = UserActivityDetailsData; // Table configuration and data
  subs: Subscription = new Subscription();
  public users = userCard;
  constructor(private userActivityService: UserActivityService) {}

  ngOnInit(): void {
    this.getAllUserActivities();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetch and bind user activity data to the table
   */
  getAllUserActivities(): void {
    this.subs.add(
      this.userActivityService.getAllUserActivities().subscribe({
        next: (res) => {
          this.userActivityDetailsData.data = res.data.map((item: any) => {
          const randomNum = Math.floor(Math.random() * 10) + 1;
          return {
            ...item,
            avatarUrl: `https://angular.pixelstrap.net/edmin/assets/images/avatar/${randomNum}.jpg`
          };
        });
        }
      })
    );
  }
}
