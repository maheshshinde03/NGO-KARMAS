import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogMasterComponent } from './blog-master.component';
import { ModifyBlogMasterComponent } from './modify-blog-master/modify-blog-master.component';

/**
 * Routes for Bonus Master management
 */
const routes: Routes = [
  {
    path: '',
    component: BlogMasterComponent,
    data: {
      title: 'Blog Master List',
      breadcrumb: 'Blog Master List'
    }
  },
  {
    path: 'create',
    component: ModifyBlogMasterComponent,
    data: {
      title: 'Create Blog Master',
      breadcrumb: 'Create Blog Master'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyBlogMasterComponent,
    data: {
      title: 'Edit Blog Master',
      breadcrumb: 'Edit Blog Master'
    }
  },
  {
    path: 'view/:id',
    component: ModifyBlogMasterComponent,
    data: {
      title: 'View Blog Master',
      breadcrumb: 'View Blog Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogMasterRoutingModule { }
