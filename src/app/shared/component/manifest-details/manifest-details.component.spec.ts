import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestDetailsComponent } from './manifest-details.component';

describe('ManifestDetailsComponent', () => {
  let component: ManifestDetailsComponent;
  let fixture: ComponentFixture<ManifestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManifestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
