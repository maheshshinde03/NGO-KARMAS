import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTicketModuleTypeComponent } from './modify-ticket-module-type.component';

describe('ModifyTicketModuleTypeComponent', () => {
  let component: ModifyTicketModuleTypeComponent;
  let fixture: ComponentFixture<ModifyTicketModuleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTicketModuleTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyTicketModuleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
