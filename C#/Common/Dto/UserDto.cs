using Repository.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}
