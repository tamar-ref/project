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
    public class IngredientRepository : IRepository<Ingredient, string>
    {
        public readonly IContext context;
        public IngredientRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<string> Add(Ingredient item)
        {
            await context.Ingredient.AddAsync(item);
            await context.Save();
            return item.Name;
        }

        public async Task Delete(string name)
        {
            context.Ingredient.Remove(await Get(name));
            await context.Save();
        }

        public async Task<Ingredient> Get(string name)
        {
            return await context.Ingredient.FirstOrDefaultAsync(x => x.Name == name);
        }

        public async Task<List<Ingredient>> GetAll()
        {
            return await context.Ingredient.ToListAsync();
        }

        public async Task<Ingredient> Update(string name, Ingredient item)
        {
            var ingredient = await Get(name);
            ingredient.Name = item.Name;
            await context.Save();
            return ingredient;
        }
    }
}
