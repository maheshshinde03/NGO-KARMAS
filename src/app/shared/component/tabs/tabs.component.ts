import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FeathericonComponent } from '../feathericon/feathericon.component';
import { PipeModule } from '@shared/pipe/pipe.module';
import { TableComponent } from '../table/table.component';
import { RowData } from '@shared/models/table';
import { Tab } from '@shared/models/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    TableModule, TagModule, IconFieldModule, InputTextModule,
    InputIconModule, MultiSelectModule, DropdownModule,
    HttpClientModule, CommonModule, FeathericonComponent,
    RouterModule, PipeModule, TableComponent
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: Tab[] = [];
  @Input() defaultTab = 0
  @Input() tabData: any[] = [];
  @Output() handleAction = new EventEmitter<{}>();

  activeTab: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.tabs.length > 0) {
      this.activeTab = this.tabs[this.defaultTab];
    }
  }

  setActiveTab(tab: any): void {
    console.log('tab = ', tab);
    this.activeTab = tab;
  }

  isCreateButtonVisible(): boolean {
    const activeTabDetails = this.tabs.find(tab => tab.name === this.activeTab.name);
    return activeTabDetails ? activeTabDetails.showCreateButton : false;
  }

  isTemplateVisible(): boolean {
    const activeTabDetails = this.tabs.find(tab => tab.name === this.activeTab.name);
    if (activeTabDetails && activeTabDetails.is_template) {
      return true;
    } else {
      return false;
    }
  }

  getCreateRoute(tab: Tab): string {
    return tab.route + '/create'; // Adjust URL formation as per your routing structure
  }

  handleCreateAction(tab: Tab): void {
    this.router.navigateByUrl(tab.route + '/create');
    // Implement other create actions as per your application's needs
  }

  handleRedirectAction(routeData:any): void {
    const navigationExtras: NavigationExtras = {
      state: {
        isAdmin: routeData?.is_admin // Your data object
      }
    };
    this.router.navigateByUrl(routeData.route,navigationExtras);
    // Implement other create actions as per your application's needs
  }

  getTabData(tabName: string): any {
    const tabIndex = this.tabs.findIndex(tab => tab.name === tabName);
    return tabIndex !== -1 ? this.tabData[tabIndex] : [];
  }

  handleActionEvent(event: any, action: any) {
    const eventAction = {
      event: event,
      action: action,
      tab: this.activeTab.name
    }
    this.handleAction.emit(eventAction);
  }
}
