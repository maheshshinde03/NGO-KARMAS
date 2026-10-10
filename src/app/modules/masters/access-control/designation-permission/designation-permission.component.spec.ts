import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationPermissionComponent } from './designation-permission.component';

describe('DesignationPermissionComponent', () => {
  let component: DesignationPermissionComponent;
  let fixture: ComponentFixture<DesignationPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignationPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
