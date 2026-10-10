import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyScoreSettingComponent } from './modify-score-setting.component';

describe('ModifyScoreSettingComponent', () => {
  let component: ModifyScoreSettingComponent;
  let fixture: ComponentFixture<ModifyScoreSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyScoreSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyScoreSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
