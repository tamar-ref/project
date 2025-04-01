using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class init4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Recipe");

            migrationBuilder.RenameColumn(
                name: "Src",
                table: "Recipe",
                newName: "Image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Recipe",
                newName: "Src");

            migrationBuilder.AddColumn<byte[]>(
                name: "Picture",
                table: "Recipe",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
