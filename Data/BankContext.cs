using BankBackOffice.Models;
using Microsoft.EntityFrameworkCore;


namespace BankBackOffice.Data

{
    public class BankContext : DbContext
    {
        public BankContext(DbContextOptions<BankContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
