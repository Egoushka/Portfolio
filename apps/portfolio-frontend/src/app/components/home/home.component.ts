import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  skills = [
    'Angular', 'TypeScript', 'JavaScript', 
    '.NET Core', 'C#', 'ASP.NET', 
    'Node.js', 'Python', 'SQL',
    'Azure', 'AWS', 'Docker'
  ];

  featuredProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with Angular frontend and .NET backend',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
      image: 'assets/images/project1.jpg',
      liveUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/your-username/project1'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      image: 'assets/images/project2.jpg',
      liveUrl: 'https://demo2.example.com',
      githubUrl: 'https://github.com/your-username/project2'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with data visualization',
      technologies: ['Vue.js', 'Python', 'FastAPI', 'Chart.js'],
      image: 'assets/images/project3.jpg',
      liveUrl: 'https://demo3.example.com',
      githubUrl: 'https://github.com/your-username/project3'
    }
  ];
}