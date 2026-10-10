import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationMasterComponent } from './donation-master.component';

describe('DonationMasterComponent', () => {
  let component: DonationMasterComponent;
  let fixture: ComponentFixture<DonationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
