import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoTypesComponent } from './ngo-types.component';

describe('NgoTypesComponent', () => {
  let component: NgoTypesComponent;
  let fixture: ComponentFixture<NgoTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
