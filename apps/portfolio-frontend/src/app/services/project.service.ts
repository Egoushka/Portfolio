import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/Projects`;

  constructor(private http: HttpClient) { }

  /**
   * Get all projects
   */
  getProjects(): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(this.apiUrl);
  }

  /**
   * Get featured projects only
   */
  getFeaturedProjects(): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${this.apiUrl}/featured`);
  }

  /**
   * Get project by ID
   */
  getProject(id: number): Observable<ProjectInfo> {
    return this.http.get<ProjectInfo>(`${this.apiUrl}/${id}`);
  }
}