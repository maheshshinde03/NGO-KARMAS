import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftRewardComponent } from './gift-reward.component';

describe('GiftRewardComponent', () => {
  let component: GiftRewardComponent;
  let fixture: ComponentFixture<GiftRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftRewardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
