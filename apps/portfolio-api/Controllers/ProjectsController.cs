using Microsoft.AspNetCore.Mvc;
using Portfolio.PortfolioApi.Models;

namespace Portfolio.PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(ILogger<ProjectsController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get all projects
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectInfo>>> GetProjects()
    {
        // Mock data - in a real app, this would come from a database
        var projects = new List<ProjectInfo>
        {
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
            }
        };

        await Task.Delay(50); // Simulate async operation
        return Ok(projects);
    }

    /// <summary>
    /// Get featured projects only
    /// </summary>
    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<ProjectInfo>>> GetFeaturedProjects()
    {
        var allProjects = await GetProjects();
        var projects = ((OkObjectResult)allProjects.Result!).Value as IEnumerable<ProjectInfo>;
        
        return Ok(projects?.Where(p => p.IsFeatured));
    }

    /// <summary>
    /// Get project by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectInfo>> GetProject(int id)
    {
        var allProjects = await GetProjects();
        var projects = ((OkObjectResult)allProjects.Result!).Value as IEnumerable<ProjectInfo>;
        
        var project = projects?.FirstOrDefault(p => p.Id == id);
        
        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }
}