using Microsoft.AspNetCore.Mvc;
using Portfolio.PortfolioApi.Models;

namespace Portfolio.PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    [HttpGet]
    public ActionResult<AboutMe> Get()
    {
        var aboutMe = new AboutMe
        {
            Id = 1,
            Name = "Your Name",
            Title = "Full-Stack Developer",
            Bio = @"I'm a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that combine beautiful design with powerful functionality. With experience in both frontend and backend development, I enjoy building end-to-end applications that provide exceptional user experiences.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying up-to-date with the latest industry trends and best practices.",
            ImageUrl = "assets/images/profile.jpg",
            Skills = new List<string>
            {
                "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "SCSS",
                ".NET Core", "C#", "ASP.NET", "Entity Framework",
                "Node.js", "Express.js", "Python", "FastAPI",
                "SQL Server", "PostgreSQL", "MongoDB", "SQLite",
                "Azure", "AWS", "Docker", "Kubernetes",
                "Git", "CI/CD", "REST APIs", "GraphQL",
                "RxJS", "NgRx", "React", "Vue.js"
            },
            Experience = new List<ExperienceItem>
            {
                new ExperienceItem
                {
                    Company = "Tech Solutions Inc.",
                    Position = "Senior Full-Stack Developer",
                    Period = "2022 - Present",
                    Description = "Lead development of enterprise web applications using Angular and .NET Core. Collaborate with cross-functional teams to deliver high-quality software solutions. Mentor junior developers and establish best practices.",
                    Technologies = new List<string> { "Angular", ".NET Core", "Azure", "SQL Server", "TypeScript" }
                },
                new ExperienceItem
                {
                    Company = "Digital Innovations Ltd.",
                    Position = "Full-Stack Developer",
                    Period = "2020 - 2022",
                    Description = "Developed and maintained multiple client-facing web applications. Implemented responsive designs and optimized application performance. Worked with RESTful APIs and microservices architecture.",
                    Technologies = new List<string> { "React", "Node.js", "MongoDB", "AWS", "Docker" }
                },
                new ExperienceItem
                {
                    Company = "StartupXYZ",
                    Position = "Frontend Developer",
                    Period = "2019 - 2020",
                    Description = "Built modern, responsive web interfaces for a fast-growing startup. Collaborated closely with designers and product managers to create intuitive user experiences.",
                    Technologies = new List<string> { "Vue.js", "JavaScript", "CSS3", "Python", "PostgreSQL" }
                }
            },
            Education = new List<EducationItem>
            {
                new EducationItem
                {
                    Institution = "University of Technology",
                    Degree = "Bachelor of Science in Computer Science",
                    Period = "2015 - 2019",
                    Description = "Focused on software engineering, algorithms, and web development. Graduated with honors."
                },
                new EducationItem
                {
                    Institution = "Tech Bootcamp Academy",
                    Degree = "Full-Stack Web Development Certificate",
                    Period = "2019",
                    Description = "Intensive program covering modern web development technologies and best practices."
                }
            },
            LastUpdated = DateTime.UtcNow
        };

        return Ok(aboutMe);
    }
}