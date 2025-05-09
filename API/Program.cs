using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>( opt => 
    opt.UseInMemoryDatabase("ProductCatalog"));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<DataContext>();

    // Sprawdź, czy są już dane – jeśli nie, dodaj startowe
    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Id = 1, Kod = "P001", Nazwa = "Laptop", Cena = 2999 },
            new Product { Id = 2, Kod = "P002", Nazwa = "Telefon", Cena = 1999 },
            new Product { Id = 3, Kod = "P003", Nazwa = "Tablet", Cena = 1599 },
            new Product { Id = 4, Kod = "P004", Nazwa = "Monitor", Cena = 1299 },
            new Product { Id = 5, Kod = "P005", Nazwa = "Klawiatura", Cena = 299 },
            new Product { Id = 6, Kod = "P006", Nazwa = "Mysz", Cena = 199 }
        );

        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
