import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProgressModalComponent } from './upload-progress-modal.component';

describe('UploadProgressModalComponent', () => {
  let component: UploadProgressModalComponent;
  let fixture: ComponentFixture<UploadProgressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadProgressModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadProgressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
