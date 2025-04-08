using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Entities;
using Swashbuckle.AspNetCore.Annotations;

namespace Common.Dto
{
    public class RecipeIngredientReadDto
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        public string IngredientName { get; set; }
        public int RecipeId { get; set; }
        public string? amount { get; set; }
    }
}
