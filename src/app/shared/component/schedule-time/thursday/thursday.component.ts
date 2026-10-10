import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thursday',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thursday.component.html',
  styleUrl: './thursday.component.scss'
})
export class ThursdayComponent {
  @Input() voyageData: any;

  getClassByIndex(index: number): string {
    const classes = ['b-l-primary', 'b-l-secondary', 'b-l-tertiary'];
    return classes[index % classes.length];  
  }
}
