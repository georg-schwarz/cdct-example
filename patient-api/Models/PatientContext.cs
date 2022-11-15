using Microsoft.EntityFrameworkCore;

namespace PatientApi.Models;

public class PatientContext : DbContext
{
    public PatientContext(DbContextOptions<PatientContext> options)
        : base(options)
    {
    }

    public DbSet<Patient> Patients { get; set; } = null!;
}