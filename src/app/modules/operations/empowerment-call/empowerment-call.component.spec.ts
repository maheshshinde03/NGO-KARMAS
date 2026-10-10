import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpowermentCallComponent } from './empowerment-call.component';

describe('EmpowermentCallComponent', () => {
  let component: EmpowermentCallComponent;
  let fixture: ComponentFixture<EmpowermentCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpowermentCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpowermentCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
