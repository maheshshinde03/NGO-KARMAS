import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserMasterComponent } from './modify-user-master.component';

describe('ModifyUserMasterComponent', () => {
  let component: ModifyUserMasterComponent;
  let fixture: ComponentFixture<ModifyUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUserMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
