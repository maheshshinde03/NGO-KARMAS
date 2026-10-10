import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoFieldMasterComponent } from './ngo-field-master.component';

describe('NgoFieldMasterComponent', () => {
  let component: NgoFieldMasterComponent;
  let fixture: ComponentFixture<NgoFieldMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoFieldMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoFieldMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
