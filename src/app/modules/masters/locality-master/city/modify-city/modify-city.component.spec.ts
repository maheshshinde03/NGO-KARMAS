import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCityComponent } from './modify-city.component';

describe('ModifyCityComponent', () => {
  let component: ModifyCityComponent;
  let fixture: ComponentFixture<ModifyCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
