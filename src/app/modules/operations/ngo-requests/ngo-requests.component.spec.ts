import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoRequestsComponent } from './ngo-requests.component';

describe('NgoRequestsComponent', () => {
  let component: NgoRequestsComponent;
  let fixture: ComponentFixture<NgoRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgoRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
