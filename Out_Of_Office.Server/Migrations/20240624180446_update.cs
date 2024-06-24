using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Out_Of_Office.Server.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectManager",
                table: "Projects",
                newName: "ProjectManagerId");

            migrationBuilder.RenameColumn(
                name: "Subdivision",
                table: "Employees",
                newName: "SubdivisionId");

            migrationBuilder.RenameColumn(
                name: "PeoplePartner",
                table: "Employees",
                newName: "PeoplePartnerId");

            migrationBuilder.RenameColumn(
                name: "LeaveRequest",
                table: "ApprovalRequests",
                newName: "LeaveRequestId");

            migrationBuilder.RenameColumn(
                name: "Approver",
                table: "ApprovalRequests",
                newName: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectManagerId",
                table: "Projects",
                column: "ProjectManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_SubdivisionId",
                table: "Employees",
                column: "SubdivisionId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRequests_ApproverId",
                table: "ApprovalRequests",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_ApprovalRequests_LeaveRequestId",
                table: "ApprovalRequests",
                column: "LeaveRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovalRequests_Employees_ApproverId",
                table: "ApprovalRequests",
                column: "ApproverId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovalRequests_LeaveRequests_LeaveRequestId",
                table: "ApprovalRequests",
                column: "LeaveRequestId",
                principalTable: "LeaveRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employees_PeoplePartnerId",
                table: "Employees",
                column: "PeoplePartnerId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Subdivisions_SubdivisionId",
                table: "Employees",
                column: "SubdivisionId",
                principalTable: "Subdivisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Employees_ProjectManagerId",
                table: "Projects",
                column: "ProjectManagerId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovalRequests_Employees_ApproverId",
                table: "ApprovalRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovalRequests_LeaveRequests_LeaveRequestId",
                table: "ApprovalRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employees_PeoplePartnerId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Subdivisions_SubdivisionId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Employees_ProjectManagerId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ProjectManagerId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Employees_PeoplePartnerId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_SubdivisionId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_ApprovalRequests_ApproverId",
                table: "ApprovalRequests");

            migrationBuilder.DropIndex(
                name: "IX_ApprovalRequests_LeaveRequestId",
                table: "ApprovalRequests");

            migrationBuilder.RenameColumn(
                name: "ProjectManagerId",
                table: "Projects",
                newName: "ProjectManager");

            migrationBuilder.RenameColumn(
                name: "SubdivisionId",
                table: "Employees",
                newName: "Subdivision");

            migrationBuilder.RenameColumn(
                name: "PeoplePartnerId",
                table: "Employees",
                newName: "PeoplePartner");

            migrationBuilder.RenameColumn(
                name: "LeaveRequestId",
                table: "ApprovalRequests",
                newName: "LeaveRequest");

            migrationBuilder.RenameColumn(
                name: "ApproverId",
                table: "ApprovalRequests",
                newName: "Approver");
        }
    }
}
