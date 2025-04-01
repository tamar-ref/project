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
    public class UserRepository : IRepository<User, string>
    {
        public readonly IContext context;
        public UserRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<string> Add(User item)
        {
            await context.User.AddAsync(item);
            await context.Save();
            return item.UserName;
        }

        public async Task Delete(string userName)
        {
            context.User.Remove(await Get(userName));
            await context.Save();
        }

        public async Task<User> Get(string userName)
        {
            return await context.User.FirstOrDefaultAsync(x => x.UserName == userName);
        }

        public async Task<List<User>> GetAll()
        {
            return await context.User.ToListAsync();
        }

        public async Task<User> Update(string userName, User item)
        {
            var user = await Get(userName);
            user.Name = item.Name;
            user.Password = item.Password;
            user.Role = item.Role;
            await context.Save();
            return user;
        }
    }
}
