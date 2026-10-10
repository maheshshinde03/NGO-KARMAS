import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoRegisterListComponent } from './modify-ngo-register-list.component';

describe('ModifyNgoRegisterListComponent', () => {
  let component: ModifyNgoRegisterListComponent;
  let fixture: ComponentFixture<ModifyNgoRegisterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoRegisterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
