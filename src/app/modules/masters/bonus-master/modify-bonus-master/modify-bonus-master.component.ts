import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';
import { BonusMasterService } from '@shared/_http/bonus-master.service';
import { BonusMasterDetailsData, BonusMasterFormStructure } from '@shared/configs/bonus-master-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { ScoreCategoryService } from '@shared/_http/score-category.service';
import { LoaderService } from '@shared/services/loader.service';

/**
 * Component for creating, editing, and viewing Bonus Master
 */

@Component({
  selector: 'app-modify-bonus-master',
  templateUrl: './modify-bonus-master.component.html',
  styleUrl: './modify-bonus-master.component.scss'
})
export class ModifyBonusMasterComponent  implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  bonusMasterFormStructure: IFormStructure[] = [];
  bonusMasterDetailsData: RowData = BonusMasterDetailsData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private bonusMasterService: BonusMasterService,
    private scoreCategoryService:ScoreCategoryService,
    public loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.bonusMasterFormStructure = JSON.parse(JSON.stringify(BonusMasterFormStructure));
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getBonus();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Disable form if in view mode
   */
  initializeForm(): void {
    this.bonusMasterFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
      if (control.type === 'select') {
        this.setOptionValues(control);
      }
    });
  }

    /**
   * Set dropdown options dynamically
   * @param control form control
   */
    setOptionValues(control: IFormStructure): void {
      if (control.listName === 'score_category_list') {
        this.subs.add(
          this.scoreCategoryService.getAllScoreCategory().subscribe({
            next: (res) => {
              control.listData = res.data;
            }
          })
        );
      }
    }

  /**
   * Fetch bonus by ID for edit/view
   */
  getBonus(): void {
    this.loader.showLoader();
    this.subs.add(
      this.bonusMasterService.getBonusById(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.bonusMasterDetailsData.data = res.data;
        },error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handle form submission for create and edit
   * @param event emitted data from app-form
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.bonusMasterService.createBonus(formData).subscribe({
            next: (res) => {
              const message = responseMessages.codes.find(item => item.code == res.error_message)?.message ?? 'Bonus created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/score-setting');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
      case 'edit':
        this.subs.add(
          this.bonusMasterService.updateBonus(formData, this.routeId).subscribe({
            next: (res) => {
              const message = responseMessages.codes.find(item => item.code == res.error_message)?.message ?? 'Bonus updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/score-setting');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }
}
