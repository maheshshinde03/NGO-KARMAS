import { Component, Input } from '@angular/core';
import { Timeline } from '@shared/models/timeline';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

  @Input() basictimelineData: Timeline[] = [];
  // public basictimelineData = [{"class":"primary","time":"<span class=\"date-content bg-light-primary\">2 Feb 2023</span><span>7:00 AM </span>","title":"CONFERENCE WITH CLIENT","dis":"At noon today, there will be a meeting with a UK client."},{"class":"secondary","time":"<span class=\"date-content bg-light-primary\">22 March 2023</span><span>3:45 PM</span>","title":"DISCUSSION WITH MARKETING TEAM","dis":"discussion with the marketing staff on the success of the most recent project"},{"class":"success","time":"<span class=\"date-content bg-light-primary\">16 May 2023</span><span>1:22 AM</span>","title":"INVEST IN A NEW HOSTING PLAN","dis":"today at 2 pm AM, purchase a new hosting package as agreed upon with the management team."},{"class":"warning","time":"<span class=\"date-content bg-light-primary\">23 Nov 2023</span><span>6:56 AM</span>","title":"DISCUSSION WITH DESIGNER TEAM","dis":"discussion with the designer employee on the success of the most recent project."},{"class":"info","time":"<span class=\"date-content bg-light-primary\">12 Dec 2023</span><span>12:05 AM</span>","title":"DISCUSSION WITH NEW THEME LAUNCH ","dis":"discussion with the how many themes made in our portfolio"}];
}
