import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoUserMasterComponent } from './ngo-user-master.component';

describe('NgoUserMasterComponent', () => {
  let component: NgoUserMasterComponent;
  let fixture: ComponentFixture<NgoUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoUserMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
