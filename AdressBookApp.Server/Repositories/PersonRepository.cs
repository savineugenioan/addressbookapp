using AdressBookApp.Server.Models;
using System.Data.SqlClient;
using System.Data;
using AddressBookApp.Server.Ports;
using Microsoft.EntityFrameworkCore;
using AddressBookApp.Server.Database;
using System.Linq;

namespace AddressBookApp.Server.Repositories
{
    public class PersonRepository(ApplicationDbContext dbContext) : IPersonRepository
    {
        public async Task<IEnumerable<Person>> GetAllPersonsAsync()
        {
            return dbContext.Persons.ToList();
        }

        public async Task<int> SeedPersonsDataAsync(int rowsCount)
        {
            if (dbContext.Persons.Count() == 0)
            {
                List<Person> persons = [];
                for (int i = 1; i <= rowsCount; i++)
                {
                    string name = $"Person {i}";
                    string address = $"{i} Main St";
                    persons.Add(new Person { Address = address, Name = name });
                }
                await dbContext.Persons.AddRangeAsync(persons);
                return await dbContext.SaveChangesAsync();
            }

            return 0;

        }
    }
}
