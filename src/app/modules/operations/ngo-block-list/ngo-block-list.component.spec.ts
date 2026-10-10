import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGOBlockListComponent } from './ngo-block-list.component';

describe('NGOBlockListComponent', () => {
  let component: NGOBlockListComponent;
  let fixture: ComponentFixture<NGOBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NGOBlockListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NGOBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
