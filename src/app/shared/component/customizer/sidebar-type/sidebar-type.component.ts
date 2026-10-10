import { Component } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-type.component.html',
  styleUrl: './sidebar-type.component.scss'
})
export class SidebarTypeComponent {

  public sidebarType: string = 'horizontal-sidebar';
  // public sidebarType: string = 'compact-wrapper';

  public screenwidth = window.innerWidth;

  constructor(public layoutService: LayoutService) {  }

  customizeSidebarType(val: string) {
    if (this.screenwidth <= 1185) {
      if (val == 'horizontal-sidebar') {
        this.layoutService.config.settings.sidebar_type = 'horizontal-sidebar'
      }
    } else {
      this.sidebarType = val;
      this.layoutService.config.settings.sidebar_type = val;
      this.layoutService.customizer = '';
    }
  }

  }
