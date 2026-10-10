import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import { currentUser } from "@shared/utils/current-user";

/**
 * Service for managing Blog_master CRUD operations.
 */
@Injectable({
  providedIn: "root"
})
export class BlogsMasterService {
  private baseUrl = environment.API_BASE_URL; // Base API URL

  constructor(private httpClient: HttpClient) { }

  /**
   * Fetch all Blogs
   */
  getAllBlogs(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}blogs`);
  }

  /**
   * Fetch a Blog by ID
   * @param id Blog_id
   */
  getBlogById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}blogs/getByBlogId?blog_id=${id}`);
  }

  /**
   * Create a new Blog
   * @param payload request payload
   */
  createBlog(payload: any): Observable<any> {
    payload['created_by'] = currentUser().user_id; // Audit user
    return this.httpClient.post(`${this.baseUrl}blogs/create`, payload);
  }

  /**
   * Update an existing Blog
   * @param payload updated data
   * @param id Blog_id
   */
  updateBlog(payload: any, id: number): Observable<any> {
    payload['modified_by'] = currentUser().user_id; // Audit user
    return this.httpClient.put(`${this.baseUrl}blogs/update?id=${id}`, payload);
  }

  /**
   * Delete a Blog
   * @param id Blog_id
   */
  deleteBlog(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}blogs/delete?id=${id}`);
  }

  uploadBlogMedia(files: any[], reqId: number): Promise<any> {
    // Extract only actual File objects and filter invalid ones
    const validFiles: File[] = files
      .map(f => f.file ? f.file : f)  // if it's wrapped object, extract `file`
      .filter(file => file && file.type); // remove invalid files

    if (!validFiles.length) return Promise.resolve([]);

    const uploadPromises = validFiles.map((file, index) => {
      const formData = new FormData();
      formData.append('mediaFile', file);
      formData.append('blog_id', reqId.toString());
      formData.append('sequence', (index + 1).toString());

      // Safety check: if type is missing, default to 'image'
      const mediaType = file.type.startsWith('video') ? 'video' : 'image';
      formData.append('Media_type', mediaType);

      return this.httpClient
        .post(`${this.baseUrl}blogmedia/create/media`, formData)
        .toPromise();
    });

    return Promise.all(uploadPromises);
  }
}
