import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() formControl!: FormControl;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() minLength = 0;
  @Input() maxLength = 500;
  @Input() name = '';
  @Input() rows = 2;
  @Input() cols = 30;
  @Input() disable = false;
  @Input() description = '';
  @Input() isUpperCase = false;
  @Output() onInputChangeEmit = new EventEmitter<any>()
  @Output() onEditIconClickEmit = new EventEmitter<any>()
  @Input() extraButtonAdding = false;
  @Input() extraButtonAddingIcon: any = 'icofont icofont-check-circled font-primary';
  @Input() extraButtonAddingText: any = 'Verify';
  @Output() onExtraButtonEmitChangeEmit = new EventEmitter<any>()


  onChange: any = () => { };
  onTouch: any = () => { };

  onInputChange(event: any): void {
    this.onInputChangeEmit.emit(event)
  }

  toUppercase(event: any) {
    const input = event.target;
    input.value = input.value.toUpperCase();
    this.formControl.setValue(input.value);
  }

  onEditIconClick() {
    this.onEditIconClickEmit.emit()
  }

  extraButtonAddingAction(value: any, event: any) {
    // const input = event.target;
    // input.value = input.value.toUpperCase();
    this.onExtraButtonEmitChangeEmit.emit({ type: value, value: event.value });
  }
}
