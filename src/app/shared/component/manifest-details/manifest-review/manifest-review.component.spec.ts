import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestReviewComponent } from './manifest-review.component';

describe('ManifestReviewComponent', () => {
  let component: ManifestReviewComponent;
  let fixture: ComponentFixture<ManifestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManifestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
