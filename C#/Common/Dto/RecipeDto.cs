using Microsoft.AspNetCore.Http;
using Repository.Entities;

namespace Common.Dto
{
    public class RecipeDto
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public IFormFile? ImageFile { get; set; } // תמונה להעלאה בלבד
        public Category Category { get; set; }
        public RecipeType RecipeType { get; set; }
        public string Description { get; set; }
        public string? Methods { get; set; }
    }
}
