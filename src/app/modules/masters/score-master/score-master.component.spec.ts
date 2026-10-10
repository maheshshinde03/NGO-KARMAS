import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreMasterComponent } from './score-master.component';

describe('ScoreMasterComponent', () => {
  let component: ScoreMasterComponent;
  let fixture: ComponentFixture<ScoreMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
