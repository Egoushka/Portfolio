using Microsoft.EntityFrameworkCore;
using Portfolio.PortfolioApi.Models;
using System.Text.Json;

namespace Portfolio.PortfolioApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ProjectInfo> Projects { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure ProjectInfo entity
        modelBuilder.Entity<ProjectInfo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title)
                  .IsRequired()
                  .HasMaxLength(200);
            entity.Property(e => e.Description)
                  .IsRequired()
                  .HasMaxLength(1000);
            entity.Property(e => e.Technologies)
                  .HasConversion(
                      v => string.Join(',', v),
                      v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
                  );
        });

        // Configure BlogPost entity
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title)
                  .IsRequired()
                  .HasMaxLength(200);
            entity.Property(e => e.Summary)
                  .IsRequired()
                  .HasMaxLength(500);
            entity.Property(e => e.Content)
                  .IsRequired();
            entity.Property(e => e.Author)
                  .IsRequired()
                  .HasMaxLength(100);
            entity.Property(e => e.Slug)
                  .IsRequired()
                  .HasMaxLength(200);
            entity.Property(e => e.Tags)
                  .HasConversion(
                      v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                      v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null) ?? new List<string>()
                  );

            // Create unique index on slug
            entity.HasIndex(e => e.Slug).IsUnique();
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        // Seed Projects
        modelBuilder.Entity<ProjectInfo>().HasData(
            new ProjectInfo
            {
                Id = 1,
                Title = "E-Commerce Platform",
                Description = "Full-stack e-commerce solution with Angular frontend and .NET backend",
                Technologies = new List<string> { "Angular", ".NET Core", "SQL Server", "Azure" },
                ImageUrl = "assets/images/project1.jpg",
                LiveUrl = "https://demo.example.com",
                GithubUrl = "https://github.com/your-username/project1",
                CreatedDate = DateTime.UtcNow.AddMonths(-6),
                IsFeatured = true
            },
            new ProjectInfo
            {
                Id = 2,
                Title = "Task Management App",
                Description = "Collaborative task management application with real-time updates",
                Technologies = new List<string> { "React", "Node.js", "MongoDB", "Socket.io" },
                ImageUrl = "assets/images/project2.jpg",
                LiveUrl = "https://demo2.example.com",
                GithubUrl = "https://github.com/your-username/project2",
                CreatedDate = DateTime.UtcNow.AddMonths(-4),
                IsFeatured = true
            },
            new ProjectInfo
            {
                Id = 3,
                Title = "Weather Dashboard",
                Description = "Interactive weather dashboard with data visualization",
                Technologies = new List<string> { "Vue.js", "Python", "FastAPI", "Chart.js" },
                ImageUrl = "assets/images/project3.jpg",
                LiveUrl = "https://demo3.example.com",
                GithubUrl = "https://github.com/your-username/project3",
                CreatedDate = DateTime.UtcNow.AddMonths(-2),
                IsFeatured = true
            },
            new ProjectInfo
            {
                Id = 4,
                Title = "Portfolio Website",
                Description = "Personal portfolio website built with modern web technologies",
                Technologies = new List<string> { "Angular", ".NET Core", "SQLite", "TypeScript" },
                ImageUrl = "assets/images/project4.jpg",
                LiveUrl = "https://portfolio.example.com",
                GithubUrl = "https://github.com/your-username/portfolio",
                CreatedDate = DateTime.UtcNow.AddMonths(-1),
                IsFeatured = false
            }
        );

        // Seed Blog Posts
        modelBuilder.Entity<BlogPost>().HasData(
            new BlogPost
            {
                Id = 1,
                Title = "Getting Started with Angular and .NET Core",
                Summary = "Learn how to build full-stack applications with Angular frontend and .NET Core backend",
                Content = "In this comprehensive guide, we'll explore how to create a modern web application using Angular for the frontend and .NET Core for the backend. We'll cover project setup, API development, and frontend integration...",
                Author = "John Doe",
                PublishedDate = DateTime.UtcNow.AddDays(-30),
                Tags = new List<string> { "Angular", ".NET Core", "Full-Stack", "Tutorial" },
                ImageUrl = "assets/images/blog1.jpg",
                Slug = "getting-started-angular-dotnet-core"
            },
            new BlogPost
            {
                Id = 2,
                Title = "Best Practices for Entity Framework Core",
                Summary = "Discover essential patterns and practices for building efficient data access layers with EF Core",
                Content = "Entity Framework Core is a powerful ORM that can greatly simplify data access in .NET applications. However, to get the best performance and maintainability, it's important to follow certain best practices...",
                Author = "John Doe",
                PublishedDate = DateTime.UtcNow.AddDays(-15),
                Tags = new List<string> { "Entity Framework", ".NET Core", "Database", "Best Practices" },
                ImageUrl = "assets/images/blog2.jpg",
                Slug = "ef-core-best-practices"
            },
            new BlogPost
            {
                Id = 3,
                Title = "Modern State Management with NgRx",
                Summary = "Implement scalable state management in Angular applications using NgRx Store",
                Content = "As Angular applications grow in complexity, managing state becomes increasingly challenging. NgRx provides a powerful solution for predictable state management based on the Redux pattern...",
                Author = "John Doe",
                PublishedDate = DateTime.UtcNow.AddDays(-7),
                Tags = new List<string> { "Angular", "NgRx", "State Management", "Redux" },
                ImageUrl = "assets/images/blog3.jpg",
                Slug = "ngrx-state-management"
            }
        );
    }
}