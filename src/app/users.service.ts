import { Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
    private readonly usersSubject$ = new BehaviorSubject<User[]>([])
    public readonly users$ = this.usersSubject$.asObservable()

    setUsers(users: User[]) {
        this.usersSubject$.next(users)
    }

    editUser(editedUser: User) {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser
                    } else {
                        return user
                    }
                }
            )
        )
    }

    createUser(user: User) {
        const userIsExisting = this.usersSubject$.value.find(currentUser => currentUser.email === user.email)
        console.log(userIsExisting)

        if (userIsExisting !== undefined) {
            alert('ЮЗЕР С ТАКИМ ЭМЭЙЛОМ УЖЕ СУЩЕСТВУЕТ')
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user])
            alert('ЮЗЕР ДОБАВЛЕН В СПИСОК')
        }
    }

    deleteUser(id: number) {
        this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id === id ? false : true))
    }
}