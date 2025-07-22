import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AboutService } from '../../services/about.service';
import { AboutMe } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  template: `
    <main class="about">
      <div class="container">
        <div *ngIf="isLoading" class="loading">
          <p>Loading...</p>
        </div>
        
        <div *ngIf="errorMessage" class="error">
          <p>{{ errorMessage }}</p>
          <button (click)="retry()" class="btn btn-primary">Try Again</button>
        </div>

        <div *ngIf="aboutData && !isLoading && !errorMessage" class="about-content" [@fadeIn]>
          <!-- Hero Section -->
          <section class="hero-section">
            <div class="hero-content">
              <div class="hero-text">
                <h1>{{ aboutData.name }}</h1>
                <h2>{{ aboutData.title }}</h2>
                <div class="bio">
                  <p *ngFor="let paragraph of getBioParagraphs()">{{ paragraph }}</p>
                </div>
              </div>
              <div class="hero-image" *ngIf="aboutData.imageUrl">
                <img [src]="aboutData.imageUrl" [alt]="aboutData.name" />
              </div>
            </div>
          </section>

          <!-- Skills Section -->
          <section class="skills-section">
            <h2>Skills & Technologies</h2>
            <div class="skills-grid">
              <span *ngFor="let skill of aboutData.skills" class="skill-tag">{{ skill }}</span>
            </div>
          </section>

          <!-- Experience Section -->
          <section class="experience-section">
            <h2>Professional Experience</h2>
            <div class="timeline">
              <div *ngFor="let exp of aboutData.experience; let i = index" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <h3>{{ exp.position }}</h3>
                    <span class="company">{{ exp.company }}</span>
                    <span class="period">{{ exp.period }}</span>
                  </div>
                  <p class="description">{{ exp.description }}</p>
                  <div class="technologies" *ngIf="exp.technologies?.length">
                    <span *ngFor="let tech of exp.technologies" class="tech-tag">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Education Section -->
          <section class="education-section">
            <h2>Education</h2>
            <div class="timeline">
              <div *ngFor="let edu of aboutData.education; let i = index" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <h3>{{ edu.degree }}</h3>
                    <span class="institution">{{ edu.institution }}</span>
                    <span class="period">{{ edu.period }}</span>
                  </div>
                  <p *ngIf="edu.description" class="description">{{ edu.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .about {
      min-height: 80vh;
      padding-top: 2rem;
    }

    .loading, .error {
      text-align: center;
      padding: 3rem 0;
    }

    .about-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .hero-section {
      margin-bottom: 4rem;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .hero-text h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      color: var(--primary-color);
    }

    .hero-text h2 {
      font-size: 1.5rem;
      color: var(--secondary-color);
      margin-bottom: 1.5rem;
    }

    .bio p {
      margin-bottom: 1rem;
      line-height: 1.7;
      color: var(--text-color);
    }

    .hero-image img {
      width: 100%;
      max-width: 300px;
      border-radius: 50%;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .skills-section, .experience-section, .education-section {
      margin-bottom: 4rem;
    }

    .skills-section h2, .experience-section h2, .education-section h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
      color: var(--secondary-color);
    }

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .skill-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Timeline Styles */
    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3rem;
      padding-left: 2rem;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 16px;
      height: 16px;
      background: var(--primary-color);
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      z-index: 1;
    }

    .timeline-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--primary-color);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .timeline-content:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .timeline-header {
      margin-bottom: 1rem;
    }

    .timeline-header h3 {
      font-size: 1.3rem;
      color: var(--secondary-color);
      margin-bottom: 0.5rem;
    }

    .company, .institution {
      font-weight: 600;
      color: var(--primary-color);
      display: block;
      margin-bottom: 0.25rem;
    }

    .period {
      color: var(--gray-medium);
      font-size: 0.9rem;
    }

    .description {
      line-height: 1.6;
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tech-tag {
      background: var(--gray-light);
      color: var(--secondary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-text h1 {
        font-size: 2.5rem;
      }

      .timeline {
        padding-left: 1.5rem;
      }

      .timeline::before {
        left: 0.75rem;
      }

      .timeline-item {
        padding-left: 1.5rem;
      }

      .timeline-marker {
        left: -1.5rem;
      }

      .timeline-content {
        padding: 1.5rem;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  aboutData: AboutMe | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.loadAboutData();
  }

  private loadAboutData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.aboutService.getAboutMe().subscribe({
      next: (data) => {
        this.aboutData = data;
        this.isLoading = false;
      },
      error: (error) => {
        // Global error interceptor will handle the notification
        this.errorMessage = 'Failed to load about information.';
        this.isLoading = false;
      }
    });
  }

  getBioParagraphs(): string[] {
    if (!this.aboutData?.bio) return [];
    return this.aboutData.bio.split('\n\n').filter((p: string) => p.trim());
  }

  retry(): void {
    this.loadAboutData();
  }
}