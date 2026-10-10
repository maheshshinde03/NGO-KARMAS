import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGiftCompanyMasterComponent } from './modify-gift-company-master.component';

describe('ModifyGiftCompanyMasterComponent', () => {
  let component: ModifyGiftCompanyMasterComponent;
  let fixture: ComponentFixture<ModifyGiftCompanyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyGiftCompanyMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyGiftCompanyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
