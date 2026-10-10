import { Component, Input, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Step } from './sc-header-model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
// import { MatHorizontalStepper, MatStep } from '@angular/material/stepper';
@Component({
  selector: 'app-mat-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './mat-stepper.component.html',
  styleUrl: './mat-stepper.component.scss'
})
export class MatStepperComponent {
  @Input() steps: Step[] = [];
  // @ViewChild(MatStepper) stepper!: MatStepper;

  @ViewChild(MatStepper) stepper: MatStepper;
  step1Completed = false;

  isLinear = true;

  complete() {
    // this.stepper.selected.completed = true;
    // this.stepper.selected.editable = false;
    this.stepper.next();
  }

  next() {
    this.stepper.next()
  }
  stepperBack() {
    this.stepper.previous()
  }
  stepperNext() {
    this.stepper.next()
  }

  submit(){
    
  }
}
