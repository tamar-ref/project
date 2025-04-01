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
    public class RecipeIngredientService : IService<RecipeIngredientDto, int>
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

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task<RecipeIngredientDto> Get(int id)
        {
            return mapper.Map<RecipeIngredientDto>(await repository.Get(id));
        }

        public async Task<List<RecipeIngredientDto>> GetAll()
        {
            return mapper.Map<List<RecipeIngredientDto>>(await repository.GetAll());
        }

        public async Task<RecipeIngredientDto> Update(int id, RecipeIngredientDto item)
        {
            return mapper.Map<RecipeIngredientDto>(await repository.Update(id, mapper.Map<RecipeIngredient>(item)));
        }
    }
}
