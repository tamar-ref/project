using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public enum Role
    {
        user,
        manager
    }
    public enum Category
    {
        main,
        addition,
        dessert,
        salad,
        soup,
        drink,
        other
    }
    public enum RecipeType
    {
        meaty,
        milky,
        pareve
    }
}
