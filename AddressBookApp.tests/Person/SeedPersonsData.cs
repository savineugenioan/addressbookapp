using AddressBookApp.Server.Database;
using AddressBookApp.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using Moq;
using AdressBookApp.Server.Models;
using AddressBookApp.Server.Ports;

[TestFixture]
public class PersonRepositoryTests
{
    private IPersonRepository _repository;
    private ApplicationDbContext _context;

    [SetUp]
    public void SetUp()
    {
        // Create an in-memory database for testing
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new ApplicationDbContext(options);
        _repository = new PersonRepository(_context);
    }

    [Test]
    public async Task SeedPersonsData_ShouldAddPersons_WhenNoPersonsExist()
    {
        // Arrange
        int rowsCount = 5;

        // Act
        int result = await _repository.SeedPersonsDataAsync(rowsCount);

        // Assert
        Assert.AreEqual(rowsCount, result);
        Assert.AreEqual(rowsCount, _context.Persons.Count());
    }

    [Test]
    public async Task SeedPersonsData_ShouldNotAddPersons_WhenPersonsExist()
    {
        //seed data only if the database is empty

        // Arrange
        var existingPersons = new List<Person>
        {
            new Person { Name = "Existing Person 1", Address = "1 Existing St" },
            new Person { Name = "Existing Person 2", Address = "2 Existing St" }
        };

        _context.Persons.AddRange(existingPersons);
        await _context.SaveChangesAsync();

        int rowsCount = 5;

        // Act
        int result = await _repository.SeedPersonsDataAsync(rowsCount);

        // Assert
        Assert.AreEqual(0, result);
        Assert.AreEqual(2, _context.Persons.Count());
    }

    [TearDown]
    public void TearDown()
    {
        _context.Database.EnsureDeleted();
        _context.Dispose();
    }
}