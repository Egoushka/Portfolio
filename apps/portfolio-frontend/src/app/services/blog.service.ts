import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/Blog`;

  constructor(private http: HttpClient) { }

  /**
   * Get all blog posts
   */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  /**
   * Get blog post by slug
   */
  getBlogPost(slug: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${slug}`);
  }

  /**
   * Get blog posts by tag
   */
  getBlogPostsByTag(tag: string): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/tag/${tag}`);
  }

  /**
   * Get recent blog posts
   */
  getRecentBlogPosts(count: number = 5): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/recent?count=${count}`);
  }
}