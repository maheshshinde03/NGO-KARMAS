import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoRequestsComponent } from './modify-ngo-requests.component';

describe('ModifyNgoRequestsComponent', () => {
  let component: ModifyNgoRequestsComponent;
  let fixture: ComponentFixture<ModifyNgoRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
