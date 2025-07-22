import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactService } from './contact.service';
import { ContactMessage, ContactResponse } from '@portfolio/generated-portfolio-api-types';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactService
      ]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit contact message', () => {
    const mockMessage: ContactMessage = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message',
      createdAt: new Date()
    };

    const mockResponse: ContactResponse = {
      success: true,
      message: 'Thank you for your message!'
    };

    service.submitContactMessage(mockMessage).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5112/api/Contact');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockMessage);
    req.flush(mockResponse);
  });

  it('should perform health check', () => {
    const mockHealth = { status: 'healthy', timestamp: new Date() };

    service.healthCheck().subscribe(health => {
      expect(health).toEqual(mockHealth);
    });

    const req = httpMock.expectOne('http://localhost:5112/api/Contact/health');
    expect(req.request.method).toBe('GET');
    req.flush(mockHealth);
  });
});