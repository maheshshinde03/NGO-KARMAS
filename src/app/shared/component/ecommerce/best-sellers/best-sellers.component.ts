import { Component } from '@angular/core';
import { BestSeller } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective,RouterModule],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent {

  public BestSellerData = BestSeller;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }

}
