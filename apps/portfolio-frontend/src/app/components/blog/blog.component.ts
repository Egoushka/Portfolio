import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  template: `
    <main class="blog">
      <div class="container">
        <div class="section text--center">
          <h1>Blog</h1>
          <p>Thoughts, tutorials, and insights about web development and technology.</p>
          <p><em>This page is under construction and will be enhanced in future iterations.</em></p>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .blog {
      min-height: 60vh;
      padding-top: 2rem;
    }
  `]
})
export class BlogComponent {}