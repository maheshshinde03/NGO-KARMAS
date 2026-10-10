import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserActivityComponent } from './modify-user-activity.component';

describe('ModifyUserActivityComponent', () => {
  let component: ModifyUserActivityComponent;
  let fixture: ComponentFixture<ModifyUserActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUserActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyUserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
