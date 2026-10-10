import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBonusMasterComponent } from './modify-bonus-master.component';

describe('ModifyBonusMasterComponent', () => {
  let component: ModifyBonusMasterComponent;
  let fixture: ComponentFixture<ModifyBonusMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyBonusMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyBonusMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
