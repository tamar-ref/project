using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IService<T, TKey>
    {
        Task<List<T>> GetAll();
        Task<T> Get(TKey id);
        Task<TKey> Add(T item);
        Task<T> Update(TKey id, T item);
        Task Delete(TKey id);
    }
    public interface IReadService<T, TKey>
    {
        Task<T> Get(TKey id);
        Task<List<T>> GetAll();
        Task Delete(TKey id);
    }
    public interface IWriteService<T, TKey>
    {
        Task<TKey> Add(T item);
        Task<T> Update(TKey id, T item);
    }
}
