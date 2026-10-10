import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesMasterComponent } from './quotes-master.component';

describe('QuotesMasterComponent', () => {
  let component: QuotesMasterComponent;
  let fixture: ComponentFixture<QuotesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotesMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
