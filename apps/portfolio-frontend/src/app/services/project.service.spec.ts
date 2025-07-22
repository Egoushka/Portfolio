import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProjectService } from './project.service';
import { ProjectInfo } from '@portfolio/generated-portfolio-api-types';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProjectService
      ]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all projects', () => {
    const mockProjects: ProjectInfo[] = [
      {
        id: 1,
        title: 'Test Project',
        description: 'Test Description',
        technologies: ['Angular', 'TypeScript'],
        imageUrl: 'test.jpg',
        liveUrl: 'https://test.com',
        githubUrl: 'https://github.com/test',
        createdDate: new Date(),
        isFeatured: true
      }
    ];

    service.getProjects().subscribe(projects => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne('http://localhost:5112/api/Projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should get featured projects', () => {
    const mockProjects: ProjectInfo[] = [
      {
        id: 1,
        title: 'Featured Project',
        description: 'Featured Description',
        technologies: ['Angular'],
        imageUrl: 'featured.jpg',
        liveUrl: 'https://featured.com',
        githubUrl: 'https://github.com/featured',
        createdDate: new Date(),
        isFeatured: true
      }
    ];

    service.getFeaturedProjects().subscribe(projects => {
      expect(projects).toEqual(mockProjects);
    });

    const req = httpMock.expectOne('http://localhost:5112/api/Projects/featured');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
  });

  it('should get project by id', () => {
    const mockProject: ProjectInfo = {
      id: 1,
      title: 'Single Project',
      description: 'Single Description',
      technologies: ['Angular'],
      imageUrl: 'single.jpg',
      liveUrl: 'https://single.com',
      githubUrl: 'https://github.com/single',
      createdDate: new Date(),
      isFeatured: false
    };

    service.getProject(1).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne('http://localhost:5112/api/Projects/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);
  });
});