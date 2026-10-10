import { Component } from '@angular/core';
import { sildesOptions , productoffer} from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-offer',
  standalone: true,
  imports: [CommonModule,RouterModule,ClickOutsideDirective,CarouselModule],
  templateUrl: './product-offer.component.html',
  styleUrl: './product-offer.component.scss'
})
export class ProductOfferComponent {

  public SildesoptionsData = sildesOptions;
  public productoffer= productoffer;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }


}
