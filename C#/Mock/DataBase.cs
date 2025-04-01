using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;

namespace Mock
{
    public class DataBase : DbContext, IContext
    {
        public DbSet<Ingredient> Ingredient { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredient { get; set; }
        public DbSet<User> User { get; set; }

        public async Task Save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=DESKTOP-DT6UMUS;database=Recipes;trusted_connection=true;TrustServerCertificate=true;");
        }
    }
}
