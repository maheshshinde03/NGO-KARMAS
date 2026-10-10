import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRequestDocumentsComponent } from './modify-request-documents.component';

describe('ModifyRequestDocumentsComponent', () => {
  let component: ModifyRequestDocumentsComponent;
  let fixture: ComponentFixture<ModifyRequestDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyRequestDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyRequestDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
