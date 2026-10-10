import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEmpowermentCallComponent } from './modify-empowerment-call.component';

describe('ModifyEmpowermentCallComponent', () => {
  let component: ModifyEmpowermentCallComponent;
  let fixture: ComponentFixture<ModifyEmpowermentCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyEmpowermentCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyEmpowermentCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
