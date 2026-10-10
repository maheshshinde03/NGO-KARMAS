import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardCountDashboardComponent } from './reward-count-dashboard.component';

describe('RewardCountDashboardComponent', () => {
  let component: RewardCountDashboardComponent;
  let fixture: ComponentFixture<RewardCountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardCountDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RewardCountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
