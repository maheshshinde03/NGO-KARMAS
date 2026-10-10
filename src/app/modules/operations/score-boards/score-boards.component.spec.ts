import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardsComponent } from './score-boards.component';

describe('ScoreBoardsComponent', () => {
  let component: ScoreBoardsComponent;
  let fixture: ComponentFixture<ScoreBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBoardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
