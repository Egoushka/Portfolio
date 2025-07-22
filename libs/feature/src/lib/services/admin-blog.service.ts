import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';

export interface CreateBlogPostRequest {
  title: string;
  content: string;
  summary?: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface UpdateBlogPostRequest {
  title: string;
  content: string;
  summary?: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminBlogService {
  private readonly apiUrl = 'http://localhost:5000/api/Blog'; // Will be updated with environment

  constructor(private http: HttpClient) { }

  /**
   * Get all blog posts
   */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  /**
   * Get blog post by ID (for editing)
   */
  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new blog post (Admin only)
   */
  createBlogPost(request: CreateBlogPostRequest): Observable<BlogPost> {
    return this.http.post<BlogPost>(this.apiUrl, request);
  }

  /**
   * Update an existing blog post (Admin only)
   */
  updateBlogPost(id: number, request: UpdateBlogPostRequest): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a blog post (Admin only)
   */
  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}