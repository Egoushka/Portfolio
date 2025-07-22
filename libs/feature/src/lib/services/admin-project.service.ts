import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

export interface CreateProjectRequest {
  title: string;
  description: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export interface UpdateProjectRequest {
  title: string;
  description: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminProjectService {
  private readonly apiUrl = 'http://localhost:5112/api/Projects'; // Updated to match running server

  constructor(private http: HttpClient) { }

  /**
   * Get all projects
   */
  getProjects(): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(this.apiUrl);
  }

  /**
   * Get project by ID
   */
  getProject(id: number): Observable<ProjectInfo> {
    return this.http.get<ProjectInfo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new project (Admin only)
   */
  createProject(request: CreateProjectRequest): Observable<ProjectInfo> {
    return this.http.post<ProjectInfo>(this.apiUrl, request);
  }

  /**
   * Update an existing project (Admin only)
   */
  updateProject(id: number, request: UpdateProjectRequest): Observable<ProjectInfo> {
    return this.http.put<ProjectInfo>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a project (Admin only)
   */
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}