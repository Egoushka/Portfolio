import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  skills = [
    'Angular', 'TypeScript', 'JavaScript', 
    '.NET Core', 'C#', 'ASP.NET', 
    'Node.js', 'Python', 'SQL',
    'Azure', 'AWS', 'Docker'
  ];

  featuredProjects: ProjectInfo[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadFeaturedProjects();
  }

  private loadFeaturedProjects(): void {
    this.projectService.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured projects:', error);
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.isLoading = false;
        // Fallback to hardcoded data for demo purposes
        this.featuredProjects = this.getFallbackProjects();
      }
    });
  }

  private getFallbackProjects(): ProjectInfo[] {
    return [
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with Angular frontend and .NET backend',
        technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
        imageUrl: 'assets/images/project1.jpg',
        liveUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/your-username/project1',
        createdDate: new Date(),
        isFeatured: true
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates',
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        imageUrl: 'assets/images/project2.jpg',
        liveUrl: 'https://demo2.example.com',
        githubUrl: 'https://github.com/your-username/project2',
        createdDate: new Date(),
        isFeatured: true
      },
      {
        id: 3,
        title: 'Weather Dashboard',
        description: 'Interactive weather dashboard with data visualization',
        technologies: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
        imageUrl: 'assets/images/project3.jpg',
        liveUrl: 'https://demo3.example.com',
        githubUrl: 'https://github.com/your-username/project3',
        createdDate: new Date(),
        isFeatured: true
      }
    ];
  }
}