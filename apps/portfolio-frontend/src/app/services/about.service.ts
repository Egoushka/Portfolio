import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutMe } from '@portfolio/generated-portfolio-api-types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly baseUrl = `${environment.apiUrl}/About`;

  constructor(private http: HttpClient) { }

  getAboutMe(): Observable<AboutMe> {
    return this.http.get<AboutMe>(this.baseUrl);
  }
}