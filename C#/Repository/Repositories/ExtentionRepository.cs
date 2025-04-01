using Microsoft.Extensions.DependencyInjection;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class ExtentionRepository
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IRepository<Ingredient, string>, IngredientRepository>();
            services.AddScoped<IRepository<Recipe, int>, RecipeRepository>();
            services.AddScoped<IRepository<RecipeIngredient, int>, RecipeIngredientRepository>();
            services.AddScoped<IRepository<User, string>, UserRepository>();
            return services;
        }
    }
}
