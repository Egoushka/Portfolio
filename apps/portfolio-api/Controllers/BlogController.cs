using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
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

    /// <summary>
    /// Create a new blog post
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<BlogPost>> CreateBlogPost([FromBody] CreateBlogPostRequest request)
    {
        try
        {
            var blogPost = new BlogPost
            {
                Title = request.Title,
                Content = request.Content,
                Summary = request.Summary ?? string.Empty,
                Slug = GenerateSlug(request.Title),
                Author = request.Author ?? "Admin",
                PublishedDate = DateTime.UtcNow,
                Tags = request.Tags ?? new List<string>(),
                ImageUrl = request.ImageUrl
            };

            _context.BlogPosts.Add(blogPost);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBlogPost), new { slug = blogPost.Slug }, blogPost);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating blog post");
            return StatusCode(500, "An error occurred while creating the blog post");
        }
    }

    /// <summary>
    /// Update an existing blog post
    /// </summary>
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateBlogPost(int id, [FromBody] UpdateBlogPostRequest request)
    {
        try
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }

            blogPost.Title = request.Title;
            blogPost.Content = request.Content;
            blogPost.Summary = request.Summary ?? string.Empty;
            blogPost.Slug = GenerateSlug(request.Title);
            blogPost.Author = request.Author ?? blogPost.Author;
            blogPost.Tags = request.Tags ?? blogPost.Tags;
            blogPost.ImageUrl = request.ImageUrl;

            await _context.SaveChangesAsync();

            return Ok(blogPost);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating blog post {Id}", id);
            return StatusCode(500, "An error occurred while updating the blog post");
        }
    }

    /// <summary>
    /// Delete a blog post
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteBlogPost(int id)
    {
        try
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if (blogPost == null)
            {
                return NotFound();
            }

            _context.BlogPosts.Remove(blogPost);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting blog post {Id}", id);
            return StatusCode(500, "An error occurred while deleting the blog post");
        }
    }

    private string GenerateSlug(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            return string.Empty;

        return title.ToLowerInvariant()
            .Replace(" ", "-")
            .Replace(".", "")
            .Replace(",", "")
            .Replace("!", "")
            .Replace("?", "")
            .Replace("'", "")
            .Replace("\"", "")
            .Replace("&", "and");
    }
}

public class CreateBlogPostRequest
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Author { get; set; }
    public List<string>? Tags { get; set; }
    public string? ImageUrl { get; set; }
}

public class UpdateBlogPostRequest
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? Author { get; set; }
    public List<string>? Tags { get; set; }
    public string? ImageUrl { get; set; }
}