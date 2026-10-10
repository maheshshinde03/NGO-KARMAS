import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBlogMasterComponent } from './modify-blog-master.component';

describe('ModifyBlogMasterComponent', () => {
  let component: ModifyBlogMasterComponent;
  let fixture: ComponentFixture<ModifyBlogMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyBlogMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyBlogMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
