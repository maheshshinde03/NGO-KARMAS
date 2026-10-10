import { Component } from '@angular/core';
import { SalesProduct } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-sales-by-product',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective],
  templateUrl: './sales-by-product.component.html',
  styleUrl: './sales-by-product.component.scss'
})
export class SalesByProductComponent {

  public SalesProduct = SalesProduct;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }

}
