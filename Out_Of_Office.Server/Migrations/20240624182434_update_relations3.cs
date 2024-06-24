using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Out_Of_Office.Server.Migrations
{
    /// <inheritdoc />
    public partial class update_relations3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_PeoplePartnerId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
