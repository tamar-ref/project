using AutoMapper;
using Common.Dto;
using Microsoft.AspNetCore.Http;
using Repository.Entities;
using System;
using System.IO;

namespace Service.Services
{
    public class MyMapper : Profile
    {
        private readonly string DirectoryUrl;

        public MyMapper()
        {
            DirectoryUrl = Path.Combine(Environment.CurrentDirectory, "Images");

            if (!Directory.Exists(DirectoryUrl))
            {
                Directory.CreateDirectory(DirectoryUrl);
            }

            CreateMap<Ingredient, IngredientDto>().ReverseMap();
            CreateMap<RecipeIngredient, RecipeIngredientDto>().ReverseMap();
            CreateMap<RecipeIngredient, RecipeIngredientReadDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<Recipe, RecipeDto>().ReverseMap();

            CreateMap<Recipe, RecipeReadDto>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => ConvertToByteArray(DirectoryUrl + src.Image)));

            CreateMap<RecipeDto, Recipe>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.ImageFile != null ? SaveImageToFile(src.ImageFile) : null));

        }

        private byte[]? ConvertToByteArray(string filePath)
        {
            if (File.Exists(filePath))
            {
                try
                {
                    return File.ReadAllBytes(filePath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error reading file: {filePath}. Error: {ex.Message}");
                }
            }
            return null;
        }

        private string? SaveImageToFile(IFormFile file)
        {
            try
            {
                string filePath = Path.Combine(DirectoryUrl, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return file.FileName;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving file: {file.FileName}. Error: {ex.Message}");
                return null;
            }
        }
    }
}
