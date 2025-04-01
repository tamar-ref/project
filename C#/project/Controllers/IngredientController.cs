using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IService<IngredientDto, string> service;
        public IngredientController(IService<IngredientDto, string> service)
        {
            this.service = service;
        }

        // GET: api/<IngredientController>
        [HttpGet]
        public async Task<List<IngredientDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<IngredientController>/5
        [HttpGet("{name}")]
        public async Task<IngredientDto> Get(string name)
        {
            return await service.Get(name);
        }

        // POST api/<IngredientController>
        [HttpPost]
        public async Task<string> Post([FromBody] IngredientDto value)
        {
            return await service.Add(value);
        }

        // PUT api/<IngredientController>/5
        [HttpPut("{name}")]
        public async Task Put(string name, [FromBody] IngredientDto value)
        {
            await service.Update(name, value);
        }

        // DELETE api/<IngredientController>/5
        [HttpDelete("{name}")]
        public async Task Delete(string name)
        {
            await service.Delete(name);
        }
    }
}
