import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class CommonDataService {

    roleData: BehaviorSubject<any> = new BehaviorSubject([])

    constructor(private router: Router) { }

    intializeCommonData() {
        // this.getRoleData()
    }

    convertTimestamp(timestamp: any) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
    
        const formattedDate = `${day} ${month} ${year}`;
    
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
    
        return {
          date: formattedDate,
          time: formattedTime
        };
      }


}