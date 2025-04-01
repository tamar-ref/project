using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Ingredient
    {
        [Required]
        [Key]
        public string Name { get; set; }
    }
}
