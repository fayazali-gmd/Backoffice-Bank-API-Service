using BankBackOffice.Data;
using BankBackOffice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

//[Authorize]
[EnableCors("*")]
[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{
    private readonly BankContext _context;

    public CustomerController(BankContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
        return Ok(_context.Customers.ToList());
    }

    [HttpPost]
    public IActionResult AddCustomer([FromBody] Customer customer)
    {
        _context.Customers.Add(customer);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetCustomers), new { id = customer.CustomerNumber }, customer);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateCustomer(int id, [FromBody] Customer customer)
    {
        var existingCustomer = _context.Customers.Find(id);
        if (existingCustomer == null)
        {
            return NotFound();
        }
        existingCustomer.CustomerName = customer.CustomerName;
        existingCustomer.DateOfBirth = customer.DateOfBirth;
        existingCustomer.Gender = customer.Gender;
        //existingCustomer.CustomerNumber = customer.CustomerNumber;
        _context.SaveChanges();
        return NoContent();
    }
}
