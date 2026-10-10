import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeathericonComponent } from '../feathericon/feathericon.component';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, NgbModule, FormsModule, FeathericonComponent, ReactiveFormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss'
})
export class DateComponent {
  @Input() formControl!: FormControl;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disable = false;
  @Input() label: string = 'Select';
  @Input() name = '';

}
