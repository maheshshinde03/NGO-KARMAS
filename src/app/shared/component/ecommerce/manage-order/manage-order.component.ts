import { Component } from '@angular/core';
import { ManageOrder } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [CommonModule,RouterModule,ClickOutsideDirective],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent {

  public ManageOrder = ManageOrder;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }


}
