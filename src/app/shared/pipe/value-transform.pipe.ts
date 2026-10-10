import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueTransform'
})
export class ValueTransformPipe implements PipeTransform {
  transform(value: any): string {
    return value === 0 || value ? 'Active' : 'Inactive';
  }
}
