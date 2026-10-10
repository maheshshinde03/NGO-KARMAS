import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoDesignationMasterComponent } from './modify-ngo-designation-master.component';

describe('ModifyNgoDesignationMasterComponent', () => {
  let component: ModifyNgoDesignationMasterComponent;
  let fixture: ComponentFixture<ModifyNgoDesignationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoDesignationMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoDesignationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
