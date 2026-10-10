import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyQuotesMasterComponent } from './modify-quotes-master.component';

describe('ModifyQuotesMasterComponent', () => {
  let component: ModifyQuotesMasterComponent;
  let fixture: ComponentFixture<ModifyQuotesMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyQuotesMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyQuotesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
