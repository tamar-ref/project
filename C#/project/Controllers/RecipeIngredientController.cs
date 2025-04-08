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
        private readonly IReadService<RecipeIngredientReadDto, int> serviceRead;
        private readonly IWriteService<RecipeIngredientDto, int> service;

        public RecipeIngredientController(IReadService<RecipeIngredientReadDto, int> serviceRead, IWriteService<RecipeIngredientDto, int> service)
        {
            this.serviceRead = serviceRead;
            this.service = service;
        }

        // GET: api/<RecipeIngredientController>
        [HttpGet]
        public async Task<List<RecipeIngredientReadDto>> Get()
        {
            return await serviceRead.GetAll();
        }

        // GET api/<RecipeIngredientController>/5
        [HttpGet("{id}")]
        public async Task<RecipeIngredientReadDto> Get(int id)
        {
            return await serviceRead.Get(id);
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
            await serviceRead.Delete(id);
        }
    }
}
