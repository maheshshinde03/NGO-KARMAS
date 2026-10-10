import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllVoyageComponent } from './dashboard-all-voyage.component';

describe('DashboardAllVoyageComponent', () => {
  let component: DashboardAllVoyageComponent;
  let fixture: ComponentFixture<DashboardAllVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAllVoyageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAllVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
