import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: ProjectInfo[] = [];
  isLoading = true;
  errorMessage = '';
  selectedTechnology: string | null = null;
  allTechnologies: string[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.extractTechnologies();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private extractTechnologies(): void {
    const techSet = new Set<string>();
    this.projects.forEach(project => {
      project.technologies?.forEach(tech => techSet.add(tech));
    });
    this.allTechnologies = Array.from(techSet).sort();
  }

  get filteredProjects(): ProjectInfo[] {
    if (!this.selectedTechnology) {
      return this.projects;
    }
    return this.projects.filter(project => 
      project.technologies?.includes(this.selectedTechnology!)
    );
  }

  filterByTechnology(technology: string | null): void {
    this.selectedTechnology = technology;
  }

  retry(): void {
    this.loadProjects();
  }
}