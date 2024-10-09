using AdressBookApp.Server.Models;

namespace AddressBookApp.Server.Ports
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllPersonsAsync();

        Task<int> SeedPersonsDataAsync(int rowsCount);
    }
}
