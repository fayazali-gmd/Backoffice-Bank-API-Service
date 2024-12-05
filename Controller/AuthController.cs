using BankBackOffice.Data;
using BankBackOffice.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[EnableCors("*")]
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly BankContext _context;

    public AuthController(BankContext context)
    {
        _context = context;
    }
    
    [HttpPost("login")]
    public IActionResult Login([FromBody] User user)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.Username == user.Username);
        if (existingUser == null || !VerifyPassword(user.PasswordHash, existingUser.PasswordHash))
        {
            return Unauthorized();
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("idQazXJ9+BSP7pSy3MUUDKbBkOgNGLFoHcLrOE9FpLzA0cdS0HEN3rYQ8cM0BxlABKkctPLDTH87IBhkQ8MPfw==");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, existingUser.UserId.ToString()) }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Ok(new { Token = tokenHandler.WriteToken(token) });
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        return password == storedHash;
    }
}

