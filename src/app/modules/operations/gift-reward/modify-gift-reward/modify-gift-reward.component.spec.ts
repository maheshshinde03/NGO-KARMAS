import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGiftRewardComponent } from './modify-gift-reward.component';

describe('ModifyGiftRewardComponent', () => {
  let component: ModifyGiftRewardComponent;
  let fixture: ComponentFixture<ModifyGiftRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyGiftRewardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyGiftRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
