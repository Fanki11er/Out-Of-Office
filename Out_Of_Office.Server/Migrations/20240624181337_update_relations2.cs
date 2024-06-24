using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Out_Of_Office.Server.Migrations
{
    /// <inheritdoc />
    public partial class update_relations2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId",
                unique: true);
        }
    }
}
