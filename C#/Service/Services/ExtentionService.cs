using Common.Dto;
using Microsoft.Extensions.DependencyInjection;
using Repository.Interfaces;
using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Service.Interfaces;
using AutoMapper;

namespace Service.Services
{
    public static class ExtentionService
    {
        public static IServiceCollection AddService(this IServiceCollection service)
        {
            service.AddRepository();
            service.AddScoped<IService<IngredientDto, string>, IngredientService>();
            service.AddScoped<IReadService<RecipeReadDto, int>, RecipeReadService>();
            service.AddScoped<IWriteService<RecipeDto, int>, RecipeService>();
            service.AddScoped<IReadService<RecipeIngredientReadDto, int>, RecipeIngredientReadService>();
            service.AddScoped<IWriteService<RecipeIngredientDto, int>, RecipeIngredientService>();
            service.AddScoped<IService<UserDto, string>, UserService>();
            service.AddAutoMapper(typeof(MyMapper));
            return service;
        }
    }
}
