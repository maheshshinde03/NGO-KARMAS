import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStatusMasterComponent } from './modify-status-master.component';

describe('ModifyStatusMasterComponent', () => {
  let component: ModifyStatusMasterComponent;
  let fixture: ComponentFixture<ModifyStatusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyStatusMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyStatusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
