import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-irn-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-irn-progress.component.html',
  styleUrl: './invoice-irn-progress.component.scss'
})
export class InvoiceIrnProgressComponent {
  public projectProgress = [{"title":"IRN","subtitle":"Generated","icon":"dash-vector","class":"primary","value":"10%","percentage":"10%","img":"assets/images/avatar/6.jpg","img1":"assets/images/user/8.jpg","extra":"+4"}];
}
