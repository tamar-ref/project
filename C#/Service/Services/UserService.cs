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
    public class UserService : IService<UserDto, string>
    {
        private readonly IRepository<User, string> repository;
        private readonly IMapper mapper;
        public UserService(IRepository<User, string> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<string> Add(UserDto item)
        {
            return await repository.Add(mapper.Map<User>(item));
        }

        public async Task Delete(string userName)
        {
            await repository.Delete(userName);
        }

        public async Task<UserDto> Get(string userName)
        {
            return mapper.Map<UserDto>(await repository.Get(userName));
        }

        public async Task<List<UserDto>> GetAll()
        {
            return mapper.Map<List<UserDto>>(await repository.GetAll());
        }

        public async Task<UserDto> Update(string userName, UserDto item)
        {
            return mapper.Map<UserDto>(await repository.Update(userName, mapper.Map<User>(item)));
        }
    }
}
