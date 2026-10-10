import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestGraphComponent } from './manifest-graph.component';

describe('ManifestGraphComponent', () => {
  let component: ManifestGraphComponent;
  let fixture: ComponentFixture<ManifestGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManifestGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManifestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
