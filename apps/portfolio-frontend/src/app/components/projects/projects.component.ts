import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  template: `
    <main class="projects">
      <div class="container">
        <div class="section text--center">
          <h1>Projects</h1>
          <p>Explore my portfolio of web applications, tools, and experiments.</p>
          <p><em>This page is under construction and will be enhanced in future iterations.</em></p>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .projects {
      min-height: 60vh;
      padding-top: 2rem;
    }
  `]
})
export class ProjectsComponent {}