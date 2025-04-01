using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeIngredientController : ControllerBase
    {
        private readonly IService<RecipeIngredientDto, int> service;
        public RecipeIngredientController(IService<RecipeIngredientDto, int> service)
        {
            this.service = service;
        }

        // GET: api/<RecipeIngredientController>
        [HttpGet]
        public async Task<List<RecipeIngredientDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<RecipeIngredientController>/5
        [HttpGet("{id}")]
        public async Task<RecipeIngredientDto> Get(int id)
        {
            return await service.Get(id);
        }

        // POST api/<RecipeIngredientController>
        [HttpPost]
        public async Task<int> Post([FromBody] RecipeIngredientDto value)
        {
            return await service.Add(value);
        }

        // PUT api/<RecipeIngredientController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] RecipeIngredientDto value)
        {
            await service.Update(id, value);
        }

        // DELETE api/<RecipeIngredientController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.Delete(id);
        }
    }
}
