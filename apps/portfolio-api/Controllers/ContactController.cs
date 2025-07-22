using Microsoft.AspNetCore.Mvc;
using Portfolio.PortfolioApi.Models;
using Portfolio.PortfolioApi.Services;

namespace Portfolio.PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IContactService contactService, ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    /// <summary>
    /// Submit a contact form message
    /// </summary>
    /// <param name="message">Contact message details</param>
    /// <returns>Response indicating success or failure</returns>
    [HttpPost]
    public async Task<ActionResult<ContactResponse>> SubmitContactMessage([FromBody] ContactMessage message)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new ContactResponse 
            { 
                Success = false, 
                Message = "Please check your input and try again." 
            });
        }

        var response = await _contactService.SendContactMessageAsync(message);
        
        if (response.Success)
        {
            return Ok(response);
        }
        
        return StatusCode(500, response);
    }

    /// <summary>
    /// Health check endpoint for contact service
    /// </summary>
    [HttpGet("health")]
    public IActionResult HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}