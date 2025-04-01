using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;

namespace Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }
        public DbSet<User> User { get; set; }
        public Task Save();
    }
}
