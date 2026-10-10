import { Component } from '@angular/core';
import { TopSellingProducts } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-top-selling-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './top-selling-products.component.html',
  styleUrl: './top-selling-products.component.scss'
})
export class TopSellingProductsComponent {

  public TopSellingProduct = TopSellingProducts;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen
  }

  clickOutside(): void {
    this.isopen = false;
  }

}
