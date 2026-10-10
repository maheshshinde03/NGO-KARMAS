import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReportPageTypeMasterComponent } from './modify-report-page-type-master.component';

describe('ModifyReportPageTypeMasterComponent', () => {
  let component: ModifyReportPageTypeMasterComponent;
  let fixture: ComponentFixture<ModifyReportPageTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyReportPageTypeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyReportPageTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
