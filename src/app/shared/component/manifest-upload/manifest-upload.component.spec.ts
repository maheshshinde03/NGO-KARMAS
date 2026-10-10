import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestUploadComponent } from './manifest-upload.component';

describe('ManifestUploadComponent', () => {
  let component: ManifestUploadComponent;
  let fixture: ComponentFixture<ManifestUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManifestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
