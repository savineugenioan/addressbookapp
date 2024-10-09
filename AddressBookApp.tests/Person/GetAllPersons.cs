using AddressBookApp.Server.Ports;
using AdressBookApp.Server.Models;
using FluentAssertions;
using Moq;

[TestFixture]
public class GetAllPersons
{
    private Mock<IPersonRepository> _mockPersonRepository;

    [SetUp]
    public void SetUp()
    {
        _mockPersonRepository = new Mock<IPersonRepository>();
    }

    [Test]
    public async Task GetPeople_ShouldReturnListOfPeople()
    {
        // Arrange
        var mockPeople = new List<Person>
        {
            new Person { Id = 1, Name = "John Doe", Address = "123 Elm St" },
            new Person { Id = 2, Name = "Jane Smith", Address = "456 Oak St" }
        };

        _mockPersonRepository.Setup(repo => repo.GetAllPersonsAsync()).ReturnsAsync(mockPeople);

        // Act
        var result = await _mockPersonRepository.Object.GetAllPersonsAsync();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEquivalentTo(mockPeople);
    }

    [Test]
    public async Task GetPeople_ShouldReturnEmptyList_WhenNoPeopleFound()
    {
        // Arrange
        List<Person> emptyPersonsList = [];
        _mockPersonRepository.Setup(repo => repo.GetAllPersonsAsync()).ReturnsAsync(emptyPersonsList);

        // Act
        var result = await _mockPersonRepository.Object.GetAllPersonsAsync();

        // Assert
        result.Should().NotBeNull();
        result.Should().BeEmpty();
    }

    [Test]
    public async Task GetPeople_WhenDatabaseThrowsException_ShouldThrowException()
    {
        // Arrange
        var expectedExceptionMessage = "Database error";
        _mockPersonRepository
            .Setup(repo => repo.GetAllPersonsAsync())
            .Throws(new Exception(expectedExceptionMessage));

        // Act
        Action action = () => _mockPersonRepository.Object.GetAllPersonsAsync();

        // Assert
        action.Should().Throw<Exception>().WithMessage(expectedExceptionMessage);
    }
}
