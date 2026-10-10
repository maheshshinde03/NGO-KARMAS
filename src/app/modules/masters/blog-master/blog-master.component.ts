import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BonusMasterService } from '@shared/_http/bonus-master.service';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { BlogMasterDetailsData } from '@shared/configs/blog-master-config';
import { BlogsMasterService } from '@shared/_http/blog-master.service';


@Component({
  selector: 'app-blog-master',
  templateUrl: './blog-master.component.html',
  styleUrl: './blog-master.component.scss'
})
export class BlogMasterComponent {
  blogMasterDetailsData: RowData = BlogMasterDetailsData;
  subs: Subscription = new Subscription();

  constructor(
    private bonusMasterService: BlogsMasterService,
    private router: Router,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetch all Blogs and bind to table
   */
  getAllBlogs(): void {
    this.loader.showLoader();
    this.subs.add(
      this.bonusMasterService.getAllBlogs().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.blogMasterDetailsData.data = res.data;
        }, error: () => {
          this.loader.showLoader();
        }
      })
    );
  }

  /**
   * Navigate to create page
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/blogs/create');
  }

  /**
   * Navigate to edit page with selected bonus ID
   * @param id bonus_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/blogs/edit/${id}`);
  }

  /**
   * Navigate to view page with selected bonus ID
   * @param id bonus_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/blogs/view/${id}`);
  }

  /**
   * Delete a bonus and refresh the list
   * @param id bonus_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.bonusMasterService.deleteBlog(id).subscribe({
        next: () => this.getAllBlogs()
      })
    );
  }
}