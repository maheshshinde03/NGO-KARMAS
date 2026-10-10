import { Component } from '@angular/core';
import { TotalSale, Neworders, OrderDelivery } from '../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { CommonModule } from '@angular/common';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductOfferComponent } from './product-offer/product-offer.component';
import { ProductProgressComponent } from './product-progress/product-progress.component';
import { SalesByProductComponent } from './sales-by-product/sales-by-product.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { TopEcommerceChartComponent } from './top-ecommerce-chart/top-ecommerce-chart.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [CommonModule, BestSellersComponent, CategoryOverviewComponent, ManageOrderComponent, ProductDetailsComponent, ProductOfferComponent
    , ProductProgressComponent, SalesByProductComponent, SalesSummaryComponent, TopEcommerceChartComponent, TopSellingProductsComponent],
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.scss'
})
export class EcommerceComponent {

  public TotalSaleChart = TotalSale;
  public NewOrderChart = Neworders;
  public OrderDeliveryChart = OrderDelivery;

}
