import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoRequestsSelfComponent } from './modify-ngo-requests-self.component';

describe('ModifyNgoRequestsSelfComponent', () => {
  let component: ModifyNgoRequestsSelfComponent;
  let fixture: ComponentFixture<ModifyNgoRequestsSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoRequestsSelfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoRequestsSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
