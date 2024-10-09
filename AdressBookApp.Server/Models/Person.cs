using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdressBookApp.Server.Models
{
    [Table("Person")]
    public class Person
    {
        [Key]
        public int Id { get; set; }

        [Required]  
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]  
        [MaxLength(250)]
        public string Address { get; set; }
    }
}
