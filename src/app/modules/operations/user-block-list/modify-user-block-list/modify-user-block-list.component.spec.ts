import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserBlockListComponent } from './modify-user-block-list.component';

describe('ModifyUserBlockListComponent', () => {
  let component: ModifyUserBlockListComponent;
  let fixture: ComponentFixture<ModifyUserBlockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyUserBlockListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyUserBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
