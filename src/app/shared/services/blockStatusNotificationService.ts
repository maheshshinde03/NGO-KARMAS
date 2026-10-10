import { Injectable } from '@angular/core';
import { ToastService } from './toast.service'; // Adjust the path as needed
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { AnimationStyleMetadata } from '@angular/animations';
@Injectable({
  providedIn: 'root'
})
export class BlockStatusNotificationService {

  constructor(private toastService: ToastService) {}

  handleStatusNotification(statusId: number, globalStatusId: number,codeId:string): boolean {
    const statusMatches = globalStatusId === statusId;
    if (statusMatches) {
      const message = responseMessages.codes.find(item => item.code === codeId)?.message ?? 'Something went wrong!';
      this.toastService.open(message, 'error');
    }
    return statusMatches;
  }
}
