import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
    selector: 'app-todos-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly todosService = inject(TodosService);
    todos = this.todosService.todos$;

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                this.todosService.setTodos(response)
            }
        )
    }

    public createTodo(event: any) {
        this.todosService.createTodo({
            userId: event.userId,
            id: new Date().getTime(),
            title: event.title,
            completed: event.completed
        })
    }

    deleteTodo(id: number) {
        this.todosService.deleteTodo(id)
    }
}