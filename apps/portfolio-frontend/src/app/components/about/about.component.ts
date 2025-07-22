import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <main class="about">
      <div class="container">
        <div class="section text--center">
          <h1>About Me</h1>
          <p>Learn more about my background, experience, and passion for development.</p>
          <p><em>This page is under construction and will be enhanced in future iterations.</em></p>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .about {
      min-height: 60vh;
      padding-top: 2rem;
    }
  `]
})
export class AboutComponent {}