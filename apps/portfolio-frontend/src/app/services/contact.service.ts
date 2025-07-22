import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage, ContactResponse } from '@portfolio/generated-portfolio-api-types';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5112/api/Contact'; // TODO: Move to environment variables

  constructor(private http: HttpClient) { }

  /**
   * Submit a contact form message
   */
  submitContactMessage(message: ContactMessage): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, message);
  }

  /**
   * Health check for contact service
   */
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}