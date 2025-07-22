import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';
import { AdminProjectService, CreateProjectRequest, UpdateProjectRequest } from '../../services/admin-project.service';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <h1>{{ isEditMode ? 'Edit Project' : 'Create New Project' }}</h1>
        <a routerLink="/admin/projects" class="btn btn-secondary">
          ← Back to Projects List
        </a>
      </div>

      <form [formGroup]="projectForm" (ngSubmit)="onSubmit()" class="project-form">
        <div class="form-group">
          <label for="title">Title *</label>
          <input 
            type="text" 
            id="title" 
            formControlName="title" 
            class="form-control"
            placeholder="Enter project title"
          >
          <div class="error" *ngIf="projectForm.get('title')?.touched && projectForm.get('title')?.errors?.['required']">
            Title is required
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea 
            id="description" 
            formControlName="description" 
            class="form-control"
            rows="4"
            placeholder="Describe the project and its features"
          ></textarea>
          <div class="error" *ngIf="projectForm.get('description')?.touched && projectForm.get('description')?.errors?.['required']">
            Description is required
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="githubUrl">GitHub URL</label>
            <input 
              type="url" 
              id="githubUrl" 
              formControlName="githubUrl" 
              class="form-control"
              placeholder="https://github.com/user/repo"
            >
          </div>

          <div class="form-group">
            <label for="liveUrl">Live URL</label>
            <input 
              type="url" 
              id="liveUrl" 
              formControlName="liveUrl" 
              class="form-control"
              placeholder="https://example.com"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input 
            type="url" 
            id="imageUrl" 
            formControlName="imageUrl" 
            class="form-control"
            placeholder="https://example.com/project-image.jpg"
          >
        </div>

        <div class="form-group">
          <label>Technologies</label>
          <div class="technologies-container">
            <div formArrayName="technologies" class="technologies-list">
              <div *ngFor="let tech of technologiesArray.controls; let i = index" class="tech-input">
                <input 
                  type="text" 
                  [formControlName]="i" 
                  class="form-control"
                  placeholder="Technology name (e.g., Angular, TypeScript)"
                >
                <button type="button" (click)="removeTechnology(i)" class="btn btn-sm btn-danger">×</button>
              </div>
            </div>
            <button type="button" (click)="addTechnology()" class="btn btn-sm btn-secondary">+ Add Technology</button>
          </div>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              formControlName="isFeatured"
              class="checkbox"
            >
            <span class="checkmark"></span>
            Featured Project
            <small class="help-text">Featured projects are displayed prominently on the homepage</small>
          </label>
        </div>

        <div class="form-actions">
          <button type="submit" [disabled]="projectForm.invalid || saving" class="btn btn-primary">
            <span *ngIf="saving" class="spinner"></span>
            {{ saving ? 'Saving...' : (isEditMode ? 'Update Project' : 'Create Project') }}
          </button>
          <a routerLink="/admin/projects" class="btn btn-secondary">Cancel</a>
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

    .project-form {
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

    .technologies-container {
      border: 1px solid var(--gray-light);
      border-radius: 4px;
      padding: 0.75rem;
    }

    .technologies-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }

    .tech-input {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .tech-input .form-control {
      margin-bottom: 0;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      font-weight: normal;
      gap: 0.75rem;
    }

    .checkbox {
      width: auto;
      margin: 0;
    }

    .help-text {
      display: block;
      color: var(--gray-medium);
      font-size: 0.875rem;
      margin-top: 0.25rem;
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
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  saving = false;
  projectId?: number;

  constructor(
    private fb: FormBuilder,
    private projectService: AdminProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.projectId = +params['id'];
        this.loadProject(this.projectId);
      }
    });
  }

  get technologiesArray() {
    return this.projectForm.get('technologies') as FormArray;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      githubUrl: [''],
      liveUrl: [''],
      imageUrl: [''],
      isFeatured: [false],
      technologies: this.fb.array([])
    });
  }

  private loadProject(id: number): void {
    this.projectService.getProject(id).subscribe({
      next: (project: ProjectInfo) => {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          imageUrl: project.imageUrl,
          isFeatured: project.isFeatured
        });

        // Set technologies
        const technologiesArray = this.technologiesArray;
        technologiesArray.clear();
        project.technologies?.forEach(tech => {
          technologiesArray.push(this.fb.control(tech));
        });
      },
      error: (error: any) => {
        console.error('Error loading project:', error);
        this.router.navigate(['/admin/projects']);
      }
    });
  }

  addTechnology(): void {
    this.technologiesArray.push(this.fb.control(''));
  }

  removeTechnology(index: number): void {
    this.technologiesArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.saving = true;
      const formValue = this.projectForm.value;
      
      // Filter out empty technologies
      const technologies = formValue.technologies.filter((tech: string) => tech.trim() !== '');
      
      const request: CreateProjectRequest | UpdateProjectRequest = {
        title: formValue.title,
        description: formValue.description,
        githubUrl: formValue.githubUrl || undefined,
        liveUrl: formValue.liveUrl || undefined,
        imageUrl: formValue.imageUrl || undefined,
        isFeatured: formValue.isFeatured,
        technologies: technologies.length > 0 ? technologies : undefined
      };

      const operation = this.isEditMode 
        ? this.projectService.updateProject(this.projectId!, request as UpdateProjectRequest)
        : this.projectService.createProject(request as CreateProjectRequest);

      operation.subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/admin/projects']);
        },
        error: (error: any) => {
          console.error('Error saving project:', error);
          this.saving = false;
          alert('Error saving project. Please try again.');
        }
      });
    }
  }
}
