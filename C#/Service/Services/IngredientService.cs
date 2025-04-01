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
    public class IngredientService : IService<IngredientDto, string>
    {
        private readonly IRepository<Ingredient, string> repository;
        private readonly IMapper mapper;
        public IngredientService(IRepository<Ingredient, string> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<string> Add(IngredientDto item)
        {
            return await repository.Add(mapper.Map<Ingredient>(item));
        }

        public async Task Delete(string name)
        {
            await repository.Delete(name);
        }

        public async Task<IngredientDto> Get(string name)
        {
            return mapper.Map<IngredientDto>(await repository.Get(name));
        }

        public async Task<List<IngredientDto>> GetAll()
        {
            return mapper.Map<List<IngredientDto>>(await repository.GetAll());
        }

        public async Task<IngredientDto> Update(string name, IngredientDto item)
        {
            return mapper.Map<IngredientDto>(await repository.Update(name, mapper.Map<Ingredient>(item)));
        }
    }
}
