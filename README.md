# Portfolio

A modern full-stack portfolio application built with Angular and .NET Core using Nx monorepo architecture.

![Portfolio Homepage](https://github.com/user-attachments/assets/526bcccc-e5af-4a70-9fb1-d716f883b602)

## 🏗️ Architecture

This project uses **Nx monorepo** to manage both frontend and backend applications:

```
├── apps/
│   ├── portfolio-frontend/     (Angular 22 SPA)
│   ├── portfolio-frontend-e2e/ (E2E tests)
│   ├── portfolio-api/          (ASP.NET Core 8 Web API)
│   └── portfolio-api-test/     (API tests)
├── libs/
│   └── generated/
│       └── portfolio-api-types/ (Shared TypeScript types)
└── nx.json, package.json, etc.
```

## 🚀 Features

### Frontend (Angular 22)
- **Responsive Design**: Mobile-first approach with SCSS
- **Modern UI**: Professional design with animations and transitions
- **Pages**: Home, About, Projects, Blog, Contact, Privacy Policy
- **Contact Form**: Full validation with reactive forms
- **Social Links**: LinkedIn, GitHub integration
- **SEO Ready**: Meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation

### Backend (.NET 8)
- **RESTful API**: Clean API architecture with controllers
- **Contact Service**: Email handling for contact forms
- **Projects API**: Dynamic project data endpoints
- **Swagger Documentation**: Interactive API docs
- **CORS**: Configured for Angular frontend
- **Logging**: Structured logging with dependency injection

## 🛠️ Tech Stack

### Frontend
- **Angular 22** with TypeScript
- **SCSS** with variables and mixins
- **Reactive Forms** for validation
- **Angular Router** for navigation
- **Font Awesome** for icons
- **ESLint & Prettier** for code quality

### Backend
- **.NET 8** with C#
- **ASP.NET Core Web API**
- **Swagger/OpenAPI** for documentation
- **Dependency Injection**
- **Model Validation**

### Development Tools
- **Nx Workspace** for monorepo management
- **Jest** for unit testing
- **Playwright** for E2E testing
- **TypeScript** for type safety
- **Hot Reload** for both frontend and backend

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- .NET 8 SDK
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development servers**
   
   Frontend (Angular):
   ```bash
   npx nx serve portfolio-frontend
   ```
   
   Backend (.NET API):
   ```bash
   npx nx serve portfolio-api
   ```

### Development URLs
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5112
- **Swagger Docs**: http://localhost:5112/swagger

## 📁 Project Structure

### Key Directories
- `apps/portfolio-frontend/src/app/components/` - Angular components
- `apps/portfolio-frontend/src/styles/` - Global SCSS styles
- `apps/portfolio-api/Controllers/` - API controllers
- `apps/portfolio-api/Services/` - Business logic services
- `apps/portfolio-api/Models/` - Data models

### Available Commands

```bash
# Build applications
npx nx build portfolio-frontend
npx nx build portfolio-api

# Run tests
npx nx test portfolio-frontend
npx nx test portfolio-api

# Lint code
npx nx lint portfolio-frontend
npx nx lint portfolio-api

# E2E tests
npx nx e2e portfolio-frontend-e2e
```

## 🎨 Customization

### Updating Personal Information
1. Replace placeholder content in components
2. Update social media links in header and footer
3. Add your profile image to `public/assets/images/`
4. Update resume PDF in `public/assets/`

### Styling
- Global variables: `src/styles/_variables.scss`
- Mixins: `src/styles/_mixins.scss`
- Layout utilities: `src/styles/_layout.scss`

### API Configuration
- Update CORS settings in `Program.cs`
- Add email service integration in `ContactService.cs`
- Configure database connections (when adding persistence)

## 🚀 Deployment

### Frontend (Firebase Hosting)
```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

### Backend (Azure App Service)
```bash
az webapp up --name your-api-name --resource-group your-resource-group
```

## 📝 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/health` - Health check

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/{id}` - Get project by ID

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development Notes

- SCSS deprecation warnings are expected and will be resolved in future Sass versions
- The project uses standalone Angular components (Angular 14+ pattern)
- API includes mock data - replace with database integration as needed
- All placeholder content should be customized for your portfolio

---

Built with ❤️ using Angular, .NET Core, and Nx