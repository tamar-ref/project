using AutoMapper;
using Common.Dto;
using Repository.Entities;
using System;
using System.IO;

namespace Service.Services
{
    public class MyMapper : Profile
    {
        string DirectoryUrl = Path.Combine(Environment.CurrentDirectory, "Images");

        public MyMapper()
        {
            if (!Directory.Exists(DirectoryUrl))
            {
                Directory.CreateDirectory(DirectoryUrl);
            }
            DirectoryUrl = DirectoryUrl + Path.DirectorySeparatorChar;

            CreateMap<Ingredient, IngredientDto>();
            CreateMap<IngredientDto, Ingredient>();

            CreateMap<Recipe, RecipeReadDto>()
                .ForMember("Image", s => s.MapFrom(y => convertToBase64(DirectoryUrl + y.Image)));

            CreateMap<RecipeDto, Recipe>()
                .ForMember("Image", s => s.MapFrom(y => y.ImageFile != null ? y.ImageFile.FileName.ToString() : null));

            CreateMap<Recipe, RecipeReadDto>()
                .ForMember("Image", s => s.MapFrom(y => convertToBase64(DirectoryUrl + y.Image)));

            CreateMap<RecipeDto, Recipe>()
                .ForMember("Image", s => s.MapFrom(y => y.ImageFile != null ? y.ImageFile.FileName.ToString() : null));

            CreateMap<RecipeIngredient, RecipeIngredientDto>();
            CreateMap<RecipeIngredientDto, RecipeIngredient>();

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }

        private string convertToBase64(string s)
        {
            if (File.Exists(s))
            {
                try
                {
                    byte[] bytes = File.ReadAllBytes(s);
                    return Convert.ToBase64String(bytes);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error reading file: {s}. Error: {ex.Message}");
                    return null;
                }
            }
            else
            {
                Console.WriteLine($"File does not exist: {s}");
                return null;
            }
        }
    }
}