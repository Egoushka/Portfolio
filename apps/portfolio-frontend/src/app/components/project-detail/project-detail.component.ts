import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  template: `
    <main class="project-detail">
      <div class="container">
        <div *ngIf="isLoading" class="loading">
          <p>Loading project details...</p>
        </div>
        
        <div *ngIf="errorMessage" class="error">
          <h1>Project Not Found</h1>
          <p>{{ errorMessage }}</p>
          <div class="actions">
            <button (click)="retry()" class="btn btn-primary">Try Again</button>
            <button (click)="goBack()" class="btn btn-secondary">Back to Projects</button>
          </div>
        </div>

        <div *ngIf="project && !isLoading && !errorMessage" class="project-content">
          <!-- Back Navigation -->
          <nav class="breadcrumb">
            <button (click)="goBack()" class="back-btn">
              ← Back to Projects
            </button>
          </nav>

          <!-- Project Header -->
          <header class="project-header">
            <div class="project-image" *ngIf="project.imageUrl">
              <img [src]="project.imageUrl" [alt]="project.title" />
            </div>
            <div class="project-info">
              <h1>{{ project.title }}</h1>
              <p class="description">{{ project.description }}</p>
              <div class="project-meta">
                <span class="created-date">Created: {{ formatDate(project.createdDate) }}</span>
                <span *ngIf="project.isFeatured" class="featured-badge">Featured</span>
              </div>
            </div>
          </header>

          <!-- Technologies Section -->
          <section class="technologies-section">
            <h2>Technologies Used</h2>
            <div class="tech-grid">
              <span *ngFor="let tech of project.technologies" class="tech-tag">{{ tech }}</span>
            </div>
          </section>

          <!-- Project Links -->
          <section class="links-section">
            <h2>Project Links</h2>
            <div class="links">
              <a *ngIf="project.liveUrl" 
                 [href]="project.liveUrl" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="btn btn-primary">
                🌐 Live Demo
              </a>
              <a *ngIf="project.githubUrl" 
                 [href]="project.githubUrl" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 class="btn btn-secondary">
                📂 View Source Code
              </a>
            </div>
          </section>

          <!-- Detailed Information Section -->
          <section class="details-section">
            <h2>Project Details</h2>
            <div class="details-content">
              <div class="detail-card">
                <h3>Overview</h3>
                <p>{{ getProjectOverview() }}</p>
              </div>
              
              <div class="detail-card">
                <h3>Key Features</h3>
                <ul>
                  <li *ngFor="let feature of getProjectFeatures()">{{ feature }}</li>
                </ul>
              </div>

              <div class="detail-card">
                <h3>Technical Highlights</h3>
                <ul>
                  <li *ngFor="let highlight of getTechnicalHighlights()">{{ highlight }}</li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Image Gallery (if we had multiple images) -->
          <section class="gallery-section" *ngIf="project.imageUrl">
            <h2>Screenshots</h2>
            <div class="gallery">
              <div class="gallery-item">
                <img [src]="project.imageUrl" [alt]="project.title + ' screenshot'" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .project-detail {
      min-height: 80vh;
      padding-top: 2rem;
    }

    .loading, .error {
      text-align: center;
      padding: 3rem 0;
    }

    .error h1 {
      color: var(--accent-color);
      margin-bottom: 1rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .project-content {
      max-width: 1000px;
      margin: 0 auto;
    }

    .breadcrumb {
      margin-bottom: 2rem;
    }

    .back-btn {
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 1rem;
      cursor: pointer;
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s ease;
    }

    .back-btn:hover {
      color: var(--secondary-color);
    }

    .project-header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
      align-items: start;
    }

    .project-image img {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .project-info h1 {
      font-size: 3rem;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    .description {
      font-size: 1.2rem;
      line-height: 1.6;
      color: var(--text-color);
      margin-bottom: 1.5rem;
    }

    .project-meta {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .created-date {
      color: var(--gray-medium);
      font-size: 0.9rem;
    }

    .featured-badge {
      background: var(--accent-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .technologies-section, .links-section, .details-section, .gallery-section {
      margin-bottom: 3rem;
    }

    .technologies-section h2, .links-section h2, .details-section h2, .gallery-section h2 {
      font-size: 2rem;
      color: var(--secondary-color);
      margin-bottom: 1.5rem;
    }

    .tech-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .tech-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background: var(--secondary-color);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: var(--gray-light);
      color: var(--secondary-color);
      border: 2px solid var(--gray-medium);
    }

    .btn-secondary:hover {
      background: var(--gray-medium);
      color: white;
      transform: translateY(-2px);
    }

    .details-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .detail-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .detail-card h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .detail-card p {
      line-height: 1.6;
      color: var(--text-color);
    }

    .detail-card ul {
      list-style: none;
      padding: 0;
    }

    .detail-card li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--gray-light);
      position: relative;
      padding-left: 1.5rem;
    }

    .detail-card li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--primary-color);
      font-weight: bold;
    }

    .detail-card li:last-child {
      border-bottom: none;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .gallery-item img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .gallery-item img:hover {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      .project-header {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .project-info h1 {
        font-size: 2.5rem;
      }

      .details-content {
        grid-template-columns: 1fr;
      }

      .links {
        flex-direction: column;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectInfo | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(+id);
      } else {
        this.errorMessage = 'Invalid project ID';
        this.isLoading = false;
      }
    });
  }

  private loadProject(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProject(id).subscribe({
      next: (project) => {
        this.project = project;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.errorMessage = 'Project not found or failed to load. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  }

  getProjectOverview(): string {
    if (!this.project?.title) return this.project?.description || '';
    
    // Enhanced descriptions based on project title
    const overviews: { [key: string]: string } = {
      'E-Commerce Platform': 'A comprehensive e-commerce solution featuring user authentication, product catalog management, shopping cart functionality, and secure payment processing. Built with modern web technologies to ensure scalability and performance.',
      'Task Management App': 'A collaborative project management application that enables teams to create, assign, and track tasks in real-time. Features include drag-and-drop interfaces, real-time notifications, and detailed project analytics.',
      'Weather Dashboard': 'An interactive weather application that provides current conditions, forecasts, and historical data visualization. Integrates with multiple weather APIs to deliver accurate and comprehensive weather information.',
      'Portfolio Website': 'A modern, responsive portfolio website showcasing professional experience, projects, and skills. Features dynamic content management, blog functionality, and optimized performance for excellent user experience.'
    };

    return overviews[this.project.title] || this.project.description || '';
  }

  getProjectFeatures(): string[] {
    if (!this.project?.title) return [];

    const features: { [key: string]: string[] } = {
      'E-Commerce Platform': [
        'User authentication and profile management',
        'Product catalog with search and filtering',
        'Shopping cart and wishlist functionality',
        'Secure payment integration',
        'Order tracking and history',
        'Admin dashboard for inventory management',
        'Responsive design for all devices'
      ],
      'Task Management App': [
        'Real-time task creation and assignment',
        'Drag-and-drop task organization',
        'Team collaboration features',
        'Project progress tracking',
        'File attachment support',
        'Email notifications and reminders',
        'Customizable project templates'
      ],
      'Weather Dashboard': [
        'Current weather conditions display',
        '7-day weather forecast',
        'Interactive weather maps',
        'Historical weather data charts',
        'Location-based weather alerts',
        'Favorite locations management',
        'Weather data export functionality'
      ],
      'Portfolio Website': [
        'Dynamic project showcase',
        'Blog with rich content editor',
        'Contact form with email integration',
        'Responsive design and animations',
        'SEO optimization',
        'Admin content management',
        'Performance monitoring'
      ]
    };

    return features[this.project.title] || [
      'Modern user interface',
      'Responsive design',
      'Performance optimized',
      'Secure implementation'
    ];
  }

  getTechnicalHighlights(): string[] {
    if (!this.project?.title) return [];

    const highlights: { [key: string]: string[] } = {
      'E-Commerce Platform': [
        'Microservices architecture with .NET Core',
        'Angular with NgRx for state management',
        'Entity Framework Core with SQL Server',
        'JWT authentication and authorization',
        'Azure deployment with CI/CD pipeline',
        'Payment gateway integration (Stripe/PayPal)',
        'Docker containerization'
      ],
      'Task Management App': [
        'React with Redux for state management',
        'Node.js with Express.js backend',
        'MongoDB with Mongoose ODM',
        'Socket.io for real-time communication',
        'AWS S3 for file storage',
        'Jest and Cypress for testing',
        'Docker deployment'
      ],
      'Weather Dashboard': [
        'Vue.js with Vuex for data management',
        'Python FastAPI backend',
        'Chart.js for data visualization',
        'OpenWeatherMap API integration',
        'PostgreSQL for data persistence',
        'Redis for caching',
        'Responsive CSS Grid layout'
      ],
      'Portfolio Website': [
        'Angular with Angular Material',
        '.NET Core Web API',
        'SQLite for development',
        'OpenAPI/Swagger documentation',
        'TypeScript for type safety',
        'SCSS for styling',
        'Nx monorepo structure'
      ]
    };

    return highlights[this.project.title] || [
      'Clean architecture patterns',
      'RESTful API design',
      'Responsive CSS implementation',
      'Modern development practices'
    ];
  }

  retry(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(+id);
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}