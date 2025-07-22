import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  isLoading = true;
  errorMessage = '';
  selectedTag: string | null = null;
  allTags: string[] = [];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  private loadBlogPosts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.blogService.getBlogPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.extractTags();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blog posts:', error);
        this.errorMessage = 'Failed to load blog posts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private extractTags(): void {
    const tagSet = new Set<string>();
    this.blogPosts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    this.allTags = Array.from(tagSet).sort();
  }

  get filteredPosts(): BlogPost[] {
    if (!this.selectedTag) {
      return this.blogPosts;
    }
    return this.blogPosts.filter(post => 
      post.tags?.includes(this.selectedTag!)
    );
  }

  filterByTag(tag: string | null): void {
    this.selectedTag = tag;
  }

  retry(): void {
    this.loadBlogPosts();
  }

  getExcerpt(content: string | undefined | null, maxLength: number = 150): string {
    if (!content) return '';
    return content.length > maxLength 
      ? content.substring(0, maxLength) + '...'
      : content;
  }
}