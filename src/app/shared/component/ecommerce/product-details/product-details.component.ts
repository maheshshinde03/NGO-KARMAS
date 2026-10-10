import { Component } from '@angular/core';
import { Addproduct } from '../../../../shared/data/dashboard/ecommerce/ecommerce';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FeathericonComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  public addProduct = Addproduct

}
