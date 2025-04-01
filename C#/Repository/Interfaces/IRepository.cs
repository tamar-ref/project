using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IRepository<T, TKey>
    {
        Task<List<T>> GetAll();
        Task<T> Get(TKey id);
        Task<TKey> Add(T item);
        Task<T> Update(TKey id, T item);
        Task Delete(TKey id);
    }
}
