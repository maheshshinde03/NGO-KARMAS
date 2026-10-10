import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogMasterRoutingModule } from './blog-master-routing.module';
import { BlogsMasterService } from '@shared/_http/blog-master.service';
import { BlogMasterComponent } from './blog-master.component';
import { ModifyBlogMasterComponent } from './modify-blog-master/modify-blog-master.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';


@NgModule({
  declarations: [BlogMasterComponent,ModifyBlogMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    BlogMasterRoutingModule
  ],
  providers:[BlogsMasterService]
})
export class BlogMasterModule { }
