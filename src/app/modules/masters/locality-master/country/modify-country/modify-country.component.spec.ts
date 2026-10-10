import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCountryComponent } from './modify-country.component';

describe('ModifyCountryComponent', () => {
  let component: ModifyCountryComponent;
  let fixture: ComponentFixture<ModifyCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
