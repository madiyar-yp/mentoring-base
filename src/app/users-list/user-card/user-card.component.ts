import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { User } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";

@Component({
    selector: 'app-user-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
    @Input()
    user!: User

    @Output()
    deleteUser = new EventEmitter<number>()

    @Output()
    editUser = new EventEmitter<User>()

    readonly dialog = inject(MatDialog)
    private snackBar = inject(MatSnackBar)

    openEditUserDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: {user: this.user}
        });
    
        dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
          if (editResult) {
            this.editUser.emit(editResult)
            this.snackBar.open('Карточка пользователя отредактирован', 'OK', {
                duration: 5000
            })
          } else {
            this.snackBar.open('Отмена редактирования', 'OK', {
                duration: 5000
            })
          }
        });
    }

    openDeleteUserDialog(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            width: '600px',
            data: this.user
        })

        dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
            if (result) {
                this.deleteUser.emit(this.user.id)
                this.snackBar.open('Пользователь удален', 'OK', {
                    duration: 5000
                })
            } else {
                this.snackBar.open('Отмена удаления', 'OK', {
                    duration: 5000
                })
            }
        });
    }
}