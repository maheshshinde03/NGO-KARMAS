import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyGiftMasterComponent } from './modify-gift-master.component';

describe('ModifyGiftMasterComponent', () => {
  let component: ModifyGiftMasterComponent;
  let fixture: ComponentFixture<ModifyGiftMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyGiftMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyGiftMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
