import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTicketMasterComponent } from './modify-ticket-master.component';

describe('ModifyTicketMasterComponent', () => {
  let component: ModifyTicketMasterComponent;
  let fixture: ComponentFixture<ModifyTicketMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTicketMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyTicketMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
