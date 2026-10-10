import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketModuleTypeComponent } from './ticket-module-type.component';

describe('TicketModuleTypeComponent', () => {
  let component: TicketModuleTypeComponent;
  let fixture: ComponentFixture<TicketModuleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketModuleTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketModuleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
