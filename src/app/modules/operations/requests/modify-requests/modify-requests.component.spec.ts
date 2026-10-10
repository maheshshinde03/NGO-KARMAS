import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRequestsComponent } from './modify-requests.component';

describe('ModifyRequestsComponent', () => {
  let component: ModifyRequestsComponent;
  let fixture: ComponentFixture<ModifyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
