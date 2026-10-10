import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { RowData } from '@shared/models/table';

@Component({
  selector: 'app-popup-form',
  standalone: true,
  imports: [CommonModule,FormComponent,TableComponent,],
  templateUrl: './popup-form.component.html',
  styleUrl: './popup-form.component.scss'
})
export class PopupFormComponent {
  subs: any;

  @Input() formDetailsData:RowData;
  @Output() handleCreateAction = new EventEmitter<void>();
  @Output() handleEditAction = new EventEmitter<void>();
  @Output() handleViewAction = new EventEmitter<void>();
  @Output() handleDeleteAction = new EventEmitter<void>();
  @Output() handleDeleteActionWithAllData = new EventEmitter<void>();
  
  constructor() { }


  ngOnInit(): void {
  }

  // ngOnDestroy(): void {
  //   this.subs.unsubscribe()
  // }

  handleCreateRoute() {
    this.handleCreateAction.emit();
  }

  handleDeleteActionRoute(event: any) {
    this.handleDeleteAction.emit(event);
  }

  handleEditActionRoute(event: any) {
    this.handleEditAction.emit(event);
  }

  handleViewActionRoute(event: any) {
    this.handleViewAction.emit(event);
  }
  handleDeleteActionWithData(event: any) {
    this.handleDeleteActionWithAllData.emit(event);
  }
}
