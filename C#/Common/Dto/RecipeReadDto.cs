using Microsoft.AspNetCore.Http;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;

namespace Common.Dto
{
    public class RecipeReadDto
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public byte[]? Image { get; set; }
        public IFormFile? ImageFile { get; set; }
        public Category Category { get; set; }
        public RecipeType RecipeType { get; set; }
        public string Description { get; set; }
        public string? Methods { get; set; }
    }
}