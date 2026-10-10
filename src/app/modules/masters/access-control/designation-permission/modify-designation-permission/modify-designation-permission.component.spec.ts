import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDesignationPermissionComponent } from './modify-designation-permission.component';

describe('ModifyDesignationPermissionComponent', () => {
  let component: ModifyDesignationPermissionComponent;
  let fixture: ComponentFixture<ModifyDesignationPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyDesignationPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyDesignationPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
