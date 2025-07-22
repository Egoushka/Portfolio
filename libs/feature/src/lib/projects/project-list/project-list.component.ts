import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminProjectService } from '../../services/admin-project.service';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>Manage Projects</h1>
        <a routerLink="/admin/projects/new" class="btn btn-primary">
          <i class="icon">🚀</i> New Project
        </a>
      </div>

      <div class="projects-table" *ngIf="projects.length > 0; else noProjects">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Technologies</th>
                <th>Featured</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let project of projects">
                <td>
                  <div class="project-title">
                    <strong>{{ project.title }}</strong>
                    <small class="project-desc">{{ project.description | slice:0:50 }}{{ project.description && project.description.length > 50 ? '...' : '' }}</small>
                  </div>
                </td>
                <td>
                  <div class="technologies">
                    <span class="tech" *ngFor="let tech of project.technologies | slice:0:3">{{ tech }}</span>
                    <span *ngIf="project.technologies && project.technologies.length > 3" class="tech-more">
                      +{{ project.technologies.length - 3 }}
                    </span>
                  </div>
                </td>
                <td>
                  <span class="featured-badge" [class.featured]="project.isFeatured">
                    {{ project.isFeatured ? '⭐ Featured' : 'Regular' }}
                  </span>
                </td>
                <td>{{ project.createdDate | date:'short' }}</td>
                <td>
                  <div class="actions">
                    <a [routerLink]="['/admin/projects/edit', project.id]" class="btn btn-sm btn-secondary">
                      Edit
                    </a>
                    <button (click)="deleteProject(project)" class="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ng-template #noProjects>
        <div class="empty-state">
          <div class="empty-icon">🚀</div>
          <h3>No projects yet</h3>
          <p>Add your first project to showcase your work.</p>
          <a routerLink="/admin/projects/new" class="btn btn-primary">Create Project</a>
        </div>
      </ng-template>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading projects...</p>
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

    .project-title strong {
      display: block;
      margin-bottom: 0.25rem;
    }

    .project-desc {
      color: var(--gray-medium);
    }

    .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .tech {
      background: var(--primary-light);
      color: var(--primary-color);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .tech-more {
      background: var(--gray-light);
      color: var(--gray-medium);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }

    .featured-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .featured-badge.featured {
      background: #fef3c7;
      color: #f59e0b;
    }

    .featured-badge:not(.featured) {
      background: var(--gray-light);
      color: var(--gray-medium);
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
export class ProjectListComponent implements OnInit {
  projects: ProjectInfo[] = [];
  loading = false;

  constructor(private projectService: AdminProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects: ProjectInfo[]) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }

  deleteProject(project: ProjectInfo): void {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      this.projectService.deleteProject(project.id!).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== project.id);
        },
        error: (error: any) => {
          console.error('Error deleting project:', error);
          alert('Error deleting project. Please try again.');
        }
      });
    }
  }
}
