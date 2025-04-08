using Repository.Entities;
using Swashbuckle.AspNetCore.Annotations;

namespace Common.Dto
{
    public class RecipeReadDto
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public byte[]? Image { get; set; } // קבלת תמונה בפורמט byte[]
        public Category Category { get; set; }
        public RecipeType RecipeType { get; set; }
        public string Description { get; set; }
        public string? Methods { get; set; }
    }
}
