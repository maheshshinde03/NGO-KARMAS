import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueTransformPipe } from './value-transform.pipe';
import { CountdownConfigPipe } from './countdown-transform.pipe';



@NgModule({
  declarations: [ValueTransformPipe,CountdownConfigPipe],
  imports: [
    CommonModule
  ],
  exports: [ValueTransformPipe,CountdownConfigPipe]
})
export class PipeModule { }
