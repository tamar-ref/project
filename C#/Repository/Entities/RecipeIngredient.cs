using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class RecipeIngredient
    {
        public int Id { get; set; }
        [Required]
        public string IngredientName { get; set; }
        public int RecipeId { get; set; }
        public string? amount { get; set; }
    }
}
