import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminBlogService } from '../../services/admin-blog.service';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>Manage Blog Posts</h1>
        <a routerLink="/admin/blog/new" class="btn btn-primary">
          <i class="icon">➕</i> New Blog Post
        </a>
      </div>

      <div class="blog-table" *ngIf="blogPosts.length > 0; else noPosts">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let post of blogPosts">
                <td>
                  <div class="post-title">
                    <strong>{{ post.title }}</strong>
                    <small class="post-slug">{{ post.slug }}</small>
                  </div>
                </td>
                <td>{{ post.author }}</td>
                <td>{{ post.publishedDate | date:'short' }}</td>
                <td>
                  <div class="tags">
                    <span class="tag" *ngFor="let tag of post.tags">{{ tag }}</span>
                  </div>
                </td>
                <td>
                  <div class="actions">
                    <a [routerLink]="['/admin/blog/edit', post.id]" class="btn btn-sm btn-secondary">
                      Edit
                    </a>
                    <button (click)="deleteBlogPost(post)" class="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ng-template #noPosts>
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>No blog posts yet</h3>
          <p>Create your first blog post to get started.</p>
          <a routerLink="/admin/blog/new" class="btn btn-primary">Create Blog Post</a>
        </div>
      </ng-template>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 2rem;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0;
      color: var(--secondary-color);
    }

    .table-responsive {
      overflow-x: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid var(--gray-light);
    }

    .data-table th {
      background: var(--gray-light);
      font-weight: 600;
      color: var(--secondary-color);
    }

    .post-title strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .post-slug {
      color: var(--gray-medium);
      font-style: italic;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .tag {
      background: var(--primary-light);
      color: var(--primary-color);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
    }

    .btn-secondary {
      background: var(--gray-medium);
      color: white;
    }

    .btn-secondary:hover {
      background: var(--secondary-color);
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: var(--secondary-color);
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: var(--gray-medium);
      margin-bottom: 1.5rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
    }

    .spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid var(--gray-light);
      border-top: 3px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .admin-page {
        padding: 1rem;
      }

      .page-header {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .actions {
        flex-direction: column;
      }
    }
  `]
})
export class BlogListComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  loading = false;

  constructor(private blogService: AdminBlogService) { }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  private loadBlogPosts(): void {
    this.loading = true;
    this.blogService.getBlogPosts().subscribe({
      next: (posts: BlogPost[]) => {
        this.blogPosts = posts;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading blog posts:', error);
        this.loading = false;
      }
    });
  }

  deleteBlogPost(post: BlogPost): void {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      this.blogService.deleteBlogPost(post.id!).subscribe({
        next: () => {
          this.blogPosts = this.blogPosts.filter(p => p.id !== post.id);
        },
        error: (error: any) => {
          console.error('Error deleting blog post:', error);
          alert('Error deleting blog post. Please try again.');
        }
      });
    }
  }
}
