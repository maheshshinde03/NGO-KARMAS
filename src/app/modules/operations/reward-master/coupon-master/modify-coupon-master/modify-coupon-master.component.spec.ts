import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCouponMasterComponent } from './modify-coupon-master.component';

describe('ModifyCouponMasterComponent', () => {
  let component: ModifyCouponMasterComponent;
  let fixture: ComponentFixture<ModifyCouponMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCouponMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCouponMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
