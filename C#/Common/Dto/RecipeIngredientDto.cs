using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class RecipeIngredientDto
    {
        public string IngredientName { get; set; }
        public int RecipeId { get; set; }
        public string? amount { get; set; }
    }
}
