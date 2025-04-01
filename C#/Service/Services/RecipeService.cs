using AutoMapper;
using Common.Dto;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class RecipeReadService : IReadService<RecipeReadDto, int>
    {
        private readonly IRepository<Recipe, int> repository;
        private readonly IMapper mapper;
        public RecipeReadService(IRepository<Recipe, int> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<RecipeReadDto> Get(int id)
        {
            return mapper.Map<RecipeReadDto>(await repository.Get(id));
        }

        public async Task<List<RecipeReadDto>> GetAll()
        {
            return mapper.Map<List<RecipeReadDto>>(await repository.GetAll());
        }
    }
    public class RecipeService : IWriteService<RecipeDto, int>
    {
        private readonly IRepository<Recipe, int> repository;
        private readonly IMapper mapper;
        public RecipeService(IRepository<Recipe, int> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<int> Add(RecipeDto item)
        {
            return await repository.Add(mapper.Map<Recipe>(item));
        }

        public async Task<RecipeDto> Update(int id, RecipeDto item)
        {
            return mapper.Map<RecipeDto>(await repository.Update(id, mapper.Map<Recipe>(item)));
        }
    }
}
