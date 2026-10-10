import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePermissionTableComponent } from './page-permission-table.component';

describe('PagePermissionTableComponent', () => {
  let component: PagePermissionTableComponent;
  let fixture: ComponentFixture<PagePermissionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePermissionTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagePermissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
