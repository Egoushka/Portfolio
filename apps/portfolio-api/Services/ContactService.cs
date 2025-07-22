using Portfolio.PortfolioApi.Models;

namespace Portfolio.PortfolioApi.Services;

public interface IContactService
{
    Task<ContactResponse> SendContactMessageAsync(ContactMessage message);
}

public class ContactService : IContactService
{
    private readonly ILogger<ContactService> _logger;

    public ContactService(ILogger<ContactService> logger)
    {
        _logger = logger;
    }

    public async Task<ContactResponse> SendContactMessageAsync(ContactMessage message)
    {
        try
        {
            // In a real application, you would:
            // 1. Save to database
            // 2. Send email notification
            // 3. Integrate with email service (SendGrid, etc.)
            
            _logger.LogInformation(
                "Contact message received from {Email}: {Subject}", 
                message.Email, 
                message.Subject);

            // Simulate async operation
            await Task.Delay(100);

            // For demo purposes, just log the message
            _logger.LogInformation(
                "Contact Details - Name: {Name}, Email: {Email}, Subject: {Subject}, Message: {Message}",
                message.Name,
                message.Email, 
                message.Subject,
                message.Message);

            return new ContactResponse
            {
                Success = true,
                Message = "Thank you for your message! I will get back to you soon."
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact message from {Email}", message.Email);
            return new ContactResponse
            {
                Success = false,
                Message = "Sorry, there was an error sending your message. Please try again later."
            };
        }
    }
}