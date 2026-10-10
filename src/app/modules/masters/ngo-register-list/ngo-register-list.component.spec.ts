import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoRegisterListComponent } from './ngo-register-list.component';

describe('NgoRegisterListComponent', () => {
  let component: NgoRegisterListComponent;
  let fixture: ComponentFixture<NgoRegisterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoRegisterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
