import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';
import { AdminBlogService, CreateBlogPostRequest, UpdateBlogPostRequest } from '../../services/admin-blog.service';

@Component({
  selector: 'app-blog-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, QuillModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>{{ isEditMode ? 'Edit Blog Post' : 'Create New Blog Post' }}</h1>
        <a routerLink="/admin/blog" class="btn btn-secondary">
          ← Back to Blog List
        </a>
      </div>

      <form [formGroup]="blogForm" (ngSubmit)="onSubmit()" class="blog-form">
        <div class="form-group">
          <label for="title">Title *</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            class="form-control"
            placeholder="Enter blog post title"
          >
          <div class="error" *ngIf="blogForm.get('title')?.touched && blogForm.get('title')?.errors?.['required']">
            Title is required
          </div>
        </div>

        <div class="form-group">
          <label for="summary">Summary</label>
          <textarea 
            id="summary" 
            formControlName="summary" 
            class="form-control"
            rows="3"
            placeholder="Brief description of the blog post"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="content">Content *</label>
          <quill-editor 
            formControlName="content"
            [modules]="quillModules"
            placeholder="Write your blog post content here..."
            class="content-editor"
          ></quill-editor>
          <div class="error" *ngIf="blogForm.get('content')?.touched && blogForm.get('content')?.errors?.['required']">
            Content is required
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="author">Author</label>
            <input 
              type="text" 
              id="author" 
              formControlName="author" 
              class="form-control"
              placeholder="Author name"
            >
          </div>

          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input 
              type="url" 
              id="imageUrl" 
              formControlName="imageUrl" 
              class="form-control"
              placeholder="https://example.com/image.jpg"
            >
          </div>
        </div>

        <div class="form-group">
          <label>Tags</label>
          <div class="tags-container">
            <div formArrayName="tags" class="tags-list">
              <div *ngFor="let tag of tagsArray.controls; let i = index" class="tag-input">
                <input 
                  type="text" 
                  [formControlName]="i" 
                  class="form-control"
                  placeholder="Tag name"
                >
                <button type="button" (click)="removeTag(i)" class="btn btn-sm btn-danger">×</button>
              </div>
            </div>
            <button type="button" (click)="addTag()" class="btn btn-sm btn-secondary">+ Add Tag</button>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="blogForm.invalid || saving" class="btn btn-primary">
            <span *ngIf="saving" class="spinner"></span>
            {{ saving ? 'Saving...' : (isEditMode ? 'Update Post' : 'Create Post') }}
          </button>
          <a routerLink="/admin/blog" class="btn btn-secondary">Cancel</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
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

    .blog-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--secondary-color);
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--gray-light);
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .content-editor {
      min-height: 300px;
    }

    .content-editor :global(.ql-editor) {
      min-height: 250px;
      font-size: 1rem;
      line-height: 1.6;
    }

    .content-editor :global(.ql-toolbar) {
      border-top: 1px solid var(--gray-light);
      border-left: 1px solid var(--gray-light);
      border-right: 1px solid var(--gray-light);
    }

    .content-editor :global(.ql-container) {
      border-bottom: 1px solid var(--gray-light);
      border-left: 1px solid var(--gray-light);
      border-right: 1px solid var(--gray-light);
    }

    .tags-container {
      border: 1px solid var(--gray-light);
      border-radius: 4px;
      padding: 0.75rem;
    }

    .tags-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .tag-input {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .tag-input .form-control {
      margin-bottom: 0;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--gray-light);
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      text-decoration: none;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
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
      font-size: 0.875rem;
    }

    .error {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
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

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  saving = false;
  blogId?: number;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private blogService: AdminBlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.blogId = +params['id'];
        this.loadBlogPost(this.blogId);
      }
    });
  }

  get tagsArray() {
    return this.blogForm.get('tags') as FormArray;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      summary: [''],
      author: ['Admin'],
      imageUrl: [''],
      tags: this.fb.array([])
    });
  }

  private loadBlogPost(id: number): void {
    this.blogService.getBlogPostById(id).subscribe({
      next: (post: BlogPost) => {
        this.blogForm.patchValue({
          title: post.title,
          content: post.content,
          summary: post.summary,
          author: post.author,
          imageUrl: post.imageUrl
        });

        // Set tags
        const tagsArray = this.tagsArray;
        tagsArray.clear();
        post.tags?.forEach(tag => {
          tagsArray.push(this.fb.control(tag));
        });
      },
      error: (error: any) => {
        console.error('Error loading blog post:', error);
        this.router.navigate(['/admin/blog']);
      }
    });
  }

  addTag(): void {
    this.tagsArray.push(this.fb.control(''));
  }

  removeTag(index: number): void {
    this.tagsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      this.saving = true;
      const formValue = this.blogForm.value;
      
      // Filter out empty tags
      const tags = formValue.tags.filter((tag: string) => tag.trim() !== '');
      
      const request: CreateBlogPostRequest | UpdateBlogPostRequest = {
        title: formValue.title,
        content: formValue.content,
        summary: formValue.summary || undefined,
        author: formValue.author || undefined,
        imageUrl: formValue.imageUrl || undefined,
        tags: tags.length > 0 ? tags : undefined
      };

      const operation = this.isEditMode 
        ? this.blogService.updateBlogPost(this.blogId!, request as UpdateBlogPostRequest)
        : this.blogService.createBlogPost(request as CreateBlogPostRequest);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/admin/blog']);
        },
        error: (error: any) => {
          console.error('Error saving blog post:', error);
          this.saving = false;
          alert('Error saving blog post. Please try again.');
        }
      });
    }
  }
}
