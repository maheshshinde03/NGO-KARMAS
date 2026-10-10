import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalInvoiceComponent } from './total-invoice.component';

describe('TotalInvoiceComponent', () => {
  let component: TotalInvoiceComponent;
  let fixture: ComponentFixture<TotalInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalInvoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
