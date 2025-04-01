using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "RecipeIngredient");

            migrationBuilder.AddColumn<string>(
                name: "IngredientName",
                table: "RecipeIngredient",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IngredientName",
                table: "RecipeIngredient");

            migrationBuilder.AddColumn<int>(
                name: "IngredientId",
                table: "RecipeIngredient",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
