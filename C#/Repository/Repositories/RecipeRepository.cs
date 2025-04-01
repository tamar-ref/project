using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class RecipeRepository : IRepository<Recipe, int>
    {
        private readonly IContext context;
        public RecipeRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<int> Add(Recipe item)
        {
            await context.Recipe.AddAsync(item);
            await context.Save();
            return item.Id;
        }

        public async Task Delete(int id)
        {
            context.Recipe.Remove(await Get(id));
            await context.Save();
        }

        public async Task<Recipe> Get(int id)
        {
            return await context.Recipe.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Recipe>> GetAll()
        {
            return await context.Recipe.ToListAsync();
        }

        public async Task<Recipe> Update(int id, Recipe item)
        {
            var recipe = await Get(id);
            recipe.Name = item.Name;
            recipe.UserName = item.UserName;
            recipe.Image = item.Image;
            recipe.Category = item.Category;
            recipe.RecipeType = item.RecipeType;
            recipe.Description = item.Description;
            recipe.Methods = item.Methods;
            await context.Save();
            return recipe;
        }
    }
}
