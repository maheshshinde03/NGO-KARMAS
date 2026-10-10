import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoTypesComponent } from './modify-ngo-types.component';

describe('ModifyNgoTypesComponent', () => {
  let component: ModifyNgoTypesComponent;
  let fixture: ComponentFixture<ModifyNgoTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
