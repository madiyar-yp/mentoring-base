import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogClose, MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../users-list.component";

@Component({
    standalone: true,
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.scss',
    imports: [MatButtonModule, MatDialogClose, MatDialogActions, MatDialogContent]
})
export class DeleteUserDialogComponent {
    public readonly data = inject<User>(MAT_DIALOG_DATA)
}