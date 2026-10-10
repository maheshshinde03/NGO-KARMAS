import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Invoice4TableComponent } from './invoice4-table/invoice4-table.component';

@Component({
  selector: 'app-invoice-4',
  standalone: true,
  imports: [CommonModule,NgxPrintModule,Invoice4TableComponent],
  templateUrl: './invoice-4.component.html',
  styleUrl: './invoice-4.component.scss'
})
export class Invoice4Component {

}
