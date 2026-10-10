import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() label: string;
  @Input() name: string = '';
  @Input() disable: boolean = true;
  @Input() description: string = '';
  // @Input() contractIdFormControl?: FormControl;
  // @Input() tariffFormControl?: FormControl;
  // @Input() qtyFormControl?: FormControl;
  // @Input() chargesFormControl?: FormControl;
  @Output() checkboxChange = new EventEmitter<any>();;
  value: boolean;
  disabled: boolean = true;

  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  onCheckboxChange(event: any,name:string): void {
    this.value = event.target.checked;
    console.log(this.value)
    console.log(name)
    // this.checkboxChange.emit
    this.onChange(this.value);
    this.onTouch();
    this.checkboxChange.emit({ name: name, formvalue: this.value })
  }

  
}
