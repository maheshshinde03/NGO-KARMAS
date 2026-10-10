import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Input() placeholder = '';
  @Input() required = false;
  @Input() disable = false;
  @Input() label: string = 'Select';
  @Input() listData = [];
  @Input() bindLabel = 'name';
  @Input() bindValue = 'id';
  @Input() name = '';
  @Input() bindMultiple = false;
  @Input() options: { value: string, label: string }[] = [];
  @Output() optionSelected = new EventEmitter<any>()

  selectedCity: string;

  constructor() {

  }

  ngOnInit(): void {
    if (!this.formControl.value) {
      this.formControl.setValue(null); // Set initial value to null if not already set
    }
  }

  onSelectionChange(selectedValue: any) {
    this.optionSelected.emit(selectedValue)
  }

}
