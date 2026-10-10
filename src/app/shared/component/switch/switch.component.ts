import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, NgbModule],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() isReversed: boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.checked);
  }
}
