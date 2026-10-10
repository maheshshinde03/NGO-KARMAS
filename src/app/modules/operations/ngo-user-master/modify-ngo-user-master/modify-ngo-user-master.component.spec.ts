import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoUserMasterComponent } from './modify-ngo-user-master.component';

describe('ModifyNgoUserMasterComponent', () => {
  let component: ModifyNgoUserMasterComponent;
  let fixture: ComponentFixture<ModifyNgoUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoUserMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
