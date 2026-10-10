import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoProfileMasterComponent } from './ngo-profile-master.component';

describe('NgoProfileMasterComponent', () => {
  let component: NgoProfileMasterComponent;
  let fixture: ComponentFixture<NgoProfileMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoProfileMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoProfileMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
