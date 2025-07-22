import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {
  blogPost: BlogPost | null = null;
  isLoading = true;
  errorMessage = '';
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadBlogPost(slug);
      }
    });
  }

  private loadBlogPost(slug: string): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.notFound = false;

    this.blogService.getBlogPost(slug).subscribe({
      next: (post) => {
        this.blogPost = post;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blog post:', error);
        if (error.status === 404) {
          this.notFound = true;
        } else {
          this.errorMessage = 'Failed to load blog post. Please try again later.';
        }
        this.isLoading = false;
      }
    });
  }

  retry(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.loadBlogPost(slug);
    }
  }
}