import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCompanyMasterComponent } from './gift-company-master.component';

describe('GiftCompanyMasterComponent', () => {
  let component: GiftCompanyMasterComponent;
  let fixture: ComponentFixture<GiftCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftCompanyMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
