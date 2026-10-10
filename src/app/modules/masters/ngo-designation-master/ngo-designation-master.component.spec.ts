import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoDesignationMasterComponent } from './ngo-designation-master.component';

describe('NgoDesignationMasterComponent', () => {
  let component: NgoDesignationMasterComponent;
  let fixture: ComponentFixture<NgoDesignationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoDesignationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoDesignationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
