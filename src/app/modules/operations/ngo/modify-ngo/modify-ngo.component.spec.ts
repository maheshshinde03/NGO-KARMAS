import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoComponent } from './modify-ngo.component';

describe('ModifyNgoComponent', () => {
  let component: ModifyNgoComponent;
  let fixture: ComponentFixture<ModifyNgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
