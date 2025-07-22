using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.PortfolioApi.Models;
using Portfolio.PortfolioApi.Data;

namespace Portfolio.PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;
    private readonly AppDbContext _context;

    public BlogController(ILogger<BlogController> logger, AppDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    /// <summary>
    /// Get all blog posts
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPosts()
    {
        try
        {
            var blogPosts = await _context.BlogPosts
                .OrderByDescending(b => b.PublishedDate)
                .ToListAsync();

            return Ok(blogPosts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving blog posts");
            return StatusCode(500, "An error occurred while retrieving blog posts");
        }
    }

    /// <summary>
    /// Get blog post by slug
    /// </summary>
    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogPost(string slug)
    {
        try
        {
            var blogPost = await _context.BlogPosts
                .FirstOrDefaultAsync(b => b.Slug == slug);
            
            if (blogPost == null)
            {
                return NotFound();
            }

            return Ok(blogPost);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving blog post with slug {Slug}", slug);
            return StatusCode(500, "An error occurred while retrieving the blog post");
        }
    }

    /// <summary>
    /// Get blog posts by tag
    /// </summary>
    [HttpGet("tag/{tag}")]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPostsByTag(string tag)
    {
        try
        {
            var blogPosts = await _context.BlogPosts
                .Where(b => b.Tags.Any(t => t.Equals(tag, StringComparison.OrdinalIgnoreCase)))
                .OrderByDescending(b => b.PublishedDate)
                .ToListAsync();

            return Ok(blogPosts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving blog posts for tag {Tag}", tag);
            return StatusCode(500, "An error occurred while retrieving blog posts");
        }
    }

    /// <summary>
    /// Get recent blog posts (limit to specified count)
    /// </summary>
    [HttpGet("recent")]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetRecentBlogPosts([FromQuery] int count = 5)
    {
        try
        {
            var blogPosts = await _context.BlogPosts
                .OrderByDescending(b => b.PublishedDate)
                .Take(Math.Min(count, 20)) // Limit to max 20 posts
                .ToListAsync();

            return Ok(blogPosts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving recent blog posts");
            return StatusCode(500, "An error occurred while retrieving recent blog posts");
        }
    }
}