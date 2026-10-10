import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-checkbox-tick',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './checkbox-tick.component.html',
  styleUrls: ['./checkbox-tick.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxTickComponent),
      multi: true,
    },
  ],
})
export class CheckboxTickComponent implements ControlValueAccessor {
  @Input() formControl!: FormControl;
  @Input() label: string;
  @Input() name: string = '';
  @Input() disable: boolean = true;
  @Input() contractIdFormControl?: FormControl;
  @Input() tariffFormControl?: FormControl;
  @Input() qtyFormControl?: FormControl;
  @Input() chargesFormControl?: FormControl;

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

  onCheckboxChange(event: any): void {
    this.value = event.target.checked;
    this.onChange(this.value);
    this.onTouch();
  }

  
}
