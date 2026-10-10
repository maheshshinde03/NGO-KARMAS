import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestViewTableComponent } from './manifest-view-table.component';

describe('ManifestViewTableComponent', () => {
  let component: ManifestViewTableComponent;
  let fixture: ComponentFixture<ManifestViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestViewTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManifestViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
