import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPageTypeMasterComponent } from './report-page-type-master.component';

describe('ReportPageTypeMasterComponent', () => {
  let component: ReportPageTypeMasterComponent;
  let fixture: ComponentFixture<ReportPageTypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPageTypeMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportPageTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
