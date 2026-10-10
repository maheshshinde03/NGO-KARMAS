import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReportMasterComponent } from './modify-report-master.component';

describe('ModifyReportMasterComponent', () => {
  let component: ModifyReportMasterComponent;
  let fixture: ComponentFixture<ModifyReportMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyReportMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyReportMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
