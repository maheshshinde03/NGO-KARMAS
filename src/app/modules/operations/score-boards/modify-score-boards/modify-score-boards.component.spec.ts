import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyScoreBoardsComponent } from './modify-score-boards.component';

describe('ModifyScoreBoardsComponent', () => {
  let component: ModifyScoreBoardsComponent;
  let fixture: ComponentFixture<ModifyScoreBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyScoreBoardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyScoreBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
