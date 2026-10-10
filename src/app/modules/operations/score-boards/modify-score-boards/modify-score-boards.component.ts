import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { ScoreBoardMasterService } from '@shared/_http/score-board.service';
import { ScoreBoardDetailsData, ScoreBoardFormStructure } from '@shared/configs/score-board-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-score-boards',
  templateUrl: './modify-score-boards.component.html',
  styleUrl: './modify-score-boards.component.scss'
})
export class ModifyScoreBoardsComponent  implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  scoreBoardSearchGroupStructure!: IFormStructure[];
  scoreBoardDetailsData: RowData = ScoreBoardDetailsData;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private cityservice: CityService, private toastService: ToastService , private scoreBoardService:ScoreBoardMasterService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.scoreBoardSearchGroupStructure = JSON.parse(JSON.stringify(ScoreBoardFormStructure));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initialization()
  }

  ngAfterViewInit(): void {
    if (this.routeId)
      this.getCountry()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.scoreBoardSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "active_status":
        ele.listData = [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }]
        break
      case "gender":
        ele.listData = [{ 'value': 0, 'gender': 'Male' }, { 'value': 1, 'gender': 'Female' }]
        break
      // case "country":
      //   this.subs.add(this.countryservice.getAllCountry().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //  break
      // case "state":
      //   this.subs.add(this.stateservice.getAllState().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //   break
    }
  }

  getCountry() {
    // this.subs.add(this.userService.getUser(this.routeId).subscribe({
    //   next: (value) => {
    //     this.scoreBoardDetailsData.data = value.data
    //   }
    // }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    formData.role_id = '1',
    formData.ngo_id = null
    // switch (this.routeName) {
    //   case 'create':
    //     this.subs.add(this.userService.createUser(formData).subscribe({
    //       next: (value) => {
    //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
    //         this.toastService.open(message, 'success');
    //         this.router.navigateByUrl("/user-master")
    //       },
    //       error: (err) => {
    //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
    //         this.toastService.open(message, 'error');
    //       }
    //     }))
    //     break;
    //   case 'edit':
    //     this.subs.add(this.userService.updateUser(formData, this.routeId).subscribe({
    //       next: (value) => {
    //         const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
    //         this.toastService.open(message, 'success');
    //         this.router.navigateByUrl("/user-master")
    //       },
    //       error: (err) => {
    //         const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
    //         this.toastService.open(message, 'error');
    //       }
    //     }))
    //     break;

    // }
  }

}



