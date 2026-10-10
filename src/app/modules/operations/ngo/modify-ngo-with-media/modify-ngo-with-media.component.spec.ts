import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNgoWithMediaComponent } from './modify-ngo-with-media.component';

describe('ModifyNgoWithMediaComponent', () => {
  let component: ModifyNgoWithMediaComponent;
  let fixture: ComponentFixture<ModifyNgoWithMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyNgoWithMediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyNgoWithMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
