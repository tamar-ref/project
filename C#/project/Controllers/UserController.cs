using Common.Dto;
using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IService<UserDto, string> service;
        public UserController(IService<UserDto, string> service)
        {
            this.service = service;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<UserController>/5
        [HttpGet("{userName}")]
        public async Task<UserDto> Get(string userName)
        {
            return await service.Get(userName);
        }

        //POST api/<UserController>
        [HttpPost]
        public async Task<string> Post([FromBody] UserDto value)
        {
            return await service.Add(value);
        }

        // PUT api/<UserController>/5
        [HttpPut("{userName}")]
        public async Task Put(string userName, [FromBody] UserDto value)
        {
            await service.Update(userName, value);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{userName}")]
        public async Task Delete(string userName)
        {
            await service.Delete(userName);
        }
    }
}
