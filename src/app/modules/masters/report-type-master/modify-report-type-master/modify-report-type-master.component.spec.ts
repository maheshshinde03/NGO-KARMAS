import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReportTypeMasterComponent } from './modify-report-type-master.component';

describe('ModifyReportTypeMasterComponent', () => {
  let component: ModifyReportTypeMasterComponent;
  let fixture: ComponentFixture<ModifyReportTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyReportTypeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyReportTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
