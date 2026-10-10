import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SvgIconComponent } from '../../../../shared/component/svg-icon/svg-icon.component';

@Component({
  selector: 'app-product-progress',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './product-progress.component.html',
  styleUrl: './product-progress.component.scss'
})
export class ProductProgressComponent {

}
