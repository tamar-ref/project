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
    public class RecipeIngredientReadService : IReadService<RecipeIngredientReadDto, int>
    {
        private readonly IRepository<RecipeIngredient, int> repository;
        private readonly IMapper mapper;
        public RecipeIngredientReadService(IRepository<RecipeIngredient, int> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<RecipeIngredientReadDto> Get(int id)
        {
            return mapper.Map<RecipeIngredientReadDto>(await repository.Get(id));
        }

        public async Task<List<RecipeIngredientReadDto>> GetAll()
        {
            return mapper.Map<List<RecipeIngredientReadDto>>(await repository.GetAll());
        }
    }
    public class RecipeIngredientService : IWriteService<RecipeIngredientDto, int>
    {
        private readonly IRepository<RecipeIngredient, int> repository;
        private readonly IMapper mapper;
        public RecipeIngredientService(IRepository<RecipeIngredient, int> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<int> Add(RecipeIngredientDto item)
        {
            return await repository.Add(mapper.Map<RecipeIngredient>(item));
        }

        public async Task<RecipeIngredientDto> Update(int id, RecipeIngredientDto item)
        {
            return mapper.Map<RecipeIngredientDto>(await repository.Update(id, mapper.Map<RecipeIngredient>(item)));
        }
    }
}
