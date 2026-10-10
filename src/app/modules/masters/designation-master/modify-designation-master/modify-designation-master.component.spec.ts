import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDesignationMasterComponent } from './modify-designation-master.component';

describe('ModifyDesignationMasterComponent', () => {
  let component: ModifyDesignationMasterComponent;
  let fixture: ComponentFixture<ModifyDesignationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyDesignationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyDesignationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
