using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Portfolio.PortfolioApi.Models;
using Portfolio.PortfolioApi.Data;

namespace Portfolio.PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;
    private readonly AppDbContext _context;

    public ProjectsController(ILogger<ProjectsController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    /// <summary>
    /// Get all projects
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectInfo>>> GetProjects()
    {
        try
        {
            var projects = await _context.Projects
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();

            return Ok(projects);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving projects");
            return StatusCode(500, "An error occurred while retrieving projects");
        }
    }

    /// <summary>
    /// Get featured projects only
    /// </summary>
    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<ProjectInfo>>> GetFeaturedProjects()
    {
        try
        {
            var projects = await _context.Projects
                .Where(p => p.IsFeatured)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();

            return Ok(projects);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving featured projects");
            return StatusCode(500, "An error occurred while retrieving featured projects");
        }
    }

    /// <summary>
    /// Get project by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectInfo>> GetProject(int id)
    {
        try
        {
            var project = await _context.Projects.FindAsync(id);
            
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving project with ID {ProjectId}", id);
            return StatusCode(500, "An error occurred while retrieving the project");
        }
    }

    /// <summary>
    /// Create a new project
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProjectInfo>> CreateProject([FromBody] CreateProjectRequest request)
    {
        try
        {
            var project = new ProjectInfo
            {
                Title = request.Title,
                Description = request.Description,
                Technologies = request.Technologies ?? new List<string>(),
                GithubUrl = request.GithubUrl,
                LiveUrl = request.LiveUrl,
                ImageUrl = request.ImageUrl,
                IsFeatured = request.IsFeatured,
                CreatedDate = DateTime.UtcNow
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating project");
            return StatusCode(500, "An error occurred while creating the project");
        }
    }

    /// <summary>
    /// Update an existing project
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] UpdateProjectRequest request)
    {
        try
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            project.Title = request.Title;
            project.Description = request.Description;
            project.Technologies = request.Technologies ?? project.Technologies;
            project.GithubUrl = request.GithubUrl;
            project.LiveUrl = request.LiveUrl;
            project.ImageUrl = request.ImageUrl;
            project.IsFeatured = request.IsFeatured;

            await _context.SaveChangesAsync();

            return Ok(project);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating project {Id}", id);
            return StatusCode(500, "An error occurred while updating the project");
        }
    }

    /// <summary>
    /// Delete a project
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProject(int id)
    {
        try
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting project {Id}", id);
            return StatusCode(500, "An error occurred while deleting the project");
        }
    }
}

public class CreateProjectRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string>? Technologies { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFeatured { get; set; }
}

public class UpdateProjectRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string>? Technologies { get; set; }
    public string? GithubUrl { get; set; }
    public string? LiveUrl { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFeatured { get; set; }
}