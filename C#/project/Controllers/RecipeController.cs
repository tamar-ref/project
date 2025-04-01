using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IReadService<RecipeReadDto, int> serviceRead;
        private readonly IWriteService<RecipeDto, int> service;

        public RecipeController(IReadService<RecipeReadDto, int> serviceRead, IWriteService<RecipeDto, int> service)
        {
            this.serviceRead = serviceRead;
            this.service = service;
        }

        // GET: api/<RecipeController>
        [HttpGet]
        public async Task<List<RecipeReadDto>> Get()
        {
            return await serviceRead.GetAll();
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public async Task<RecipeReadDto> Get(int id)
        {
            return await serviceRead.Get(id);
        }

        // POST api/<RecipeController>
        [HttpPost]
        public async Task<int> Post([FromForm] RecipeDto value)
        {
            return await service.Add(value);
        }

        // PUT api/<RecipeController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromForm] RecipeDto value)
        {
            await service.Update(id, value);
        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await serviceRead.Delete(id);
        }
    }
}
