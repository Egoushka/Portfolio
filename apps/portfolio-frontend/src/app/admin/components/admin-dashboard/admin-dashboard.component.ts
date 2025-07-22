import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-dashboard">
      <header class="admin-header">
        <div class="container">
          <h1>Admin Dashboard</h1>
          <nav class="admin-nav">
            <a routerLink="/admin/blog" routerLinkActive="active" class="nav-link">Blog Posts</a>
            <a routerLink="/admin/projects" routerLinkActive="active" class="nav-link">Projects</a>
            <button (click)="logout()" class="btn btn-secondary">Logout</button>
          </nav>
        </div>
      </header>

      <main class="admin-content">
        <div class="container">
          <div class="dashboard-grid">
            <div class="dashboard-card">
              <div class="card-icon">📝</div>
              <h3>Manage Blog Posts</h3>
              <p>Create, edit, and manage your blog content</p>
              <a routerLink="/admin/blog" class="btn btn-primary">Go to Blog Management</a>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">🚀</div>
              <h3>Manage Projects</h3>
              <p>Add and update your portfolio projects</p>
              <a routerLink="/admin/projects" class="btn btn-primary">Go to Project Management</a>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">📊</div>
              <h3>Analytics</h3>
              <p>View site statistics and performance</p>
              <span class="btn btn-disabled">Coming Soon</span>
            </div>

            <div class="dashboard-card">
              <div class="card-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Configure site settings and preferences</p>
              <span class="btn btn-disabled">Coming Soon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      min-height: 100vh;
      background: var(--gray-light);
    }

    .admin-header {
      background: white;
      border-bottom: 1px solid var(--gray-light);
      padding: 1rem 0;
    }

    .admin-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .admin-header h1 {
      color: var(--secondary-color);
      margin: 0;
    }

    .admin-nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-link {
      text-decoration: none;
      color: var(--gray-medium);
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      color: var(--primary-color);
      background: var(--primary-light);
    }

    .admin-content {
      padding: 2rem 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .dashboard-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.2s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .dashboard-card h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    .dashboard-card p {
      color: var(--gray-medium);
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
    }

    .btn-secondary {
      background: var(--gray-medium);
      color: white;
    }

    .btn-secondary:hover {
      background: var(--secondary-color);
    }

    .btn-disabled {
      background: var(--gray-light);
      color: var(--gray-medium);
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .admin-header .container {
        flex-direction: column;
        gap: 1rem;
      }

      .admin-nav {
        flex-wrap: wrap;
        justify-content: center;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}