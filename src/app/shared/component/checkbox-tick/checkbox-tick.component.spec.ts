import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxTickComponent } from './checkbox-tick.component';

describe('CheckboxTickComponent', () => {
  let component: CheckboxTickComponent;
  let fixture: ComponentFixture<CheckboxTickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxTickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckboxTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
