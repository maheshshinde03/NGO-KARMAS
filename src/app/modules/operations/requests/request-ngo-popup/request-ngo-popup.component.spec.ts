import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNgoPopupComponent } from './request-ngo-popup.component';

describe('RequestNgoPopupComponent', () => {
  let component: RequestNgoPopupComponent;
  let fixture: ComponentFixture<RequestNgoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestNgoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestNgoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
