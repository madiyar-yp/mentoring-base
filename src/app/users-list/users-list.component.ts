import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    };
    phone?: string;
    website: string;
    company: {
        name: string,
        catchPhrase?: string,
        bs?: string
    };
}

export interface CreateUser {
    id: number;
    name: string;
    email: string;
    website: string;
    companyName: string;
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent, MatButtonModule],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);
    users = this.usersService.users$;

    readonly dialog = inject(MatDialog)
    private snackBar = inject(MatSnackBar)

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateUserFormComponent, {
            data: {user: this.users}
        });

        dialogRef.afterClosed().subscribe((result: CreateUser | undefined) => {
            if (result) {
                this.createUser(result)
                this.snackBar.open('Пользователь создан', 'OK', {
                    duration: 5000
                })
            } else {
                this.snackBar.open('Отмена создания пользователя', 'OK', {
                    duration: 5000
                })
            }
        });
    }

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: any) => {
                this.usersService.setUsers(response)
            }
        )
    }

    createUser(formData: CreateUser) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.companyName
            }
        })
    }

    editUser(updatedData: CreateUser) {
        const currentUsers = this.usersService.getCurrentUsers()
        const originalUser = currentUsers.find((user: User) => user.id === updatedData.id)
        
        if (!originalUser) {
            console.error('Пользователь не найден:', updatedData.id)
            return;
        }

        this.usersService.editUser({
            ...originalUser,
            name: updatedData.name,
            email: updatedData.email,
            website: updatedData.website,
            company: {
                ...originalUser.company,
                name: updatedData.companyName
            }
        })
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }
}