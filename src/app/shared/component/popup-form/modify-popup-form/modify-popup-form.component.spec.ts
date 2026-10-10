import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPopupFormComponent } from './modify-popup-form.component';

describe('ModifyPopupFormComponent', () => {
  let component: ModifyPopupFormComponent;
  let fixture: ComponentFixture<ModifyPopupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPopupFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
