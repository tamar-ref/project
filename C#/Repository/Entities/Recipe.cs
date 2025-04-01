using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class Recipe
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string UserName { get; set; }
        public string? Image { get; set; }
        public Category Category { get; set; }
        public RecipeType RecipeType { get; set; }
        [Required]
        public string Description { get; set; }
        public string? Methods { get; set; }
    }
}
