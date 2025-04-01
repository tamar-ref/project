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
    public class RecipeIngredientRepository : IRepository<RecipeIngredient, int>
    {
        public readonly IContext context;
        public RecipeIngredientRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<int> Add(RecipeIngredient item)
        {
            await context.RecipeIngredient.AddAsync(item);
            await context.Save();
            return item.Id;
        }

        public async Task Delete(int id)
        {
            context.RecipeIngredient.Remove(await Get(id));
            await context.Save();
        }

        public async Task<RecipeIngredient> Get(int id)
        {
            return await context.RecipeIngredient.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<RecipeIngredient>> GetAll()
        {
            return await context.RecipeIngredient.ToListAsync();
        }

        public async Task<RecipeIngredient> Update(int id, RecipeIngredient item)
        {
            var recipeIngredient = await Get(id);
            recipeIngredient.IngredientName = item.IngredientName;
            recipeIngredient.RecipeId = item.RecipeId;
            recipeIngredient.amount = item.amount;
            await context.Save();
            return recipeIngredient;
        }
    }
}
