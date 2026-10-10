import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftMasterComponent } from './gift-master.component';

describe('GiftMasterComponent', () => {
  let component: GiftMasterComponent;
  let fixture: ComponentFixture<GiftMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GiftMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
