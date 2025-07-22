import { Route } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogFormComponent } from './blog/blog-form/blog-form.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';

export const blogRoutes: Route[] = [
  { path: '', component: BlogListComponent },
  { path: 'new', component: BlogFormComponent },
  { path: 'edit/:id', component: BlogFormComponent }
];

export const projectRoutes: Route[] = [
  { path: '', component: ProjectListComponent },
  { path: 'new', component: ProjectFormComponent },
  { path: 'edit/:id', component: ProjectFormComponent }
];
