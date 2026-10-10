import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'countdownConfig',
  pure: false
})
export class CountdownConfigPipe implements PipeTransform, OnDestroy {
  private subscription: Subscription | null = null;
  private timeLeft: number = 0;

  transform(expectedArrivalDatetime: string, days: number = 15): any {
    const now = new Date().getTime();
    const arrivalDate = new Date(expectedArrivalDatetime).getTime();
    const daysInMs = days * 24 * 60 * 60 * 1000;
    this.timeLeft = (arrivalDate - daysInMs) - now;

    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      return null;
    }

    if (!this.subscription) {
      this.subscription = interval(1000).pipe(
        map(() => {
          this.timeLeft -= 1000;
        })
      ).subscribe();
    }

    return {
      leftTime: this.timeLeft / 1000,
      format: 'dd:hh:mm:ss',
      prettyText: (text: any) => {
        const duration = moment.duration(this.timeLeft);
        const months = Math.floor(duration.asMonths());
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        return `${months} Months ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
