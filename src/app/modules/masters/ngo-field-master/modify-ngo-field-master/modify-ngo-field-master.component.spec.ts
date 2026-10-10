import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoFieldMasterComponent } from './modify-ngo-field-master.component';

describe('ModifyNgoFieldMasterComponent', () => {
  let component: ModifyNgoFieldMasterComponent;
  let fixture: ComponentFixture<ModifyNgoFieldMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoFieldMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoFieldMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
