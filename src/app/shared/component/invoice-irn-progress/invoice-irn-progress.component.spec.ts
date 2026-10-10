import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceIrnProgressComponent } from './invoice-irn-progress.component';

describe('InvoiceIrnProgressComponent', () => {
  let component: InvoiceIrnProgressComponent;
  let fixture: ComponentFixture<InvoiceIrnProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceIrnProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceIrnProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
