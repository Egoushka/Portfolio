using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
}