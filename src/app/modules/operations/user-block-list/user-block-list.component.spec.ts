import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USERBlockListComponent } from './user-block-list.component';

describe('USERBlockListComponent', () => {
  let component: USERBlockListComponent;
  let fixture: ComponentFixture<USERBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [USERBlockListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(USERBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
