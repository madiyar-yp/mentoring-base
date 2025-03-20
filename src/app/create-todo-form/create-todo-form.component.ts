import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim().toLowerCase()
        if (value === 'да' || value === 'нет') {
            return null
        }
        return {invalidCompleted: true}
    }
}

@Component({
    selector: 'app-create-todo-form',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './create-todo-form.component.html',
    styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
    @Output() createTodo = new EventEmitter()

    public formTodo = new FormGroup({
        userId: new FormControl('', [Validators.required]),
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        completed: new FormControl('', [Validators.required, completedValidator()])
    })

    private getCompletedValue(): boolean {
        const value = this.formTodo.get('completed')?.value!.trim().toLowerCase()
        return value === 'да' ? true : false;
    }

    public submitForm() {
        this.createTodo.emit({...this.formTodo.value, completed: this.getCompletedValue()})
        this.formTodo.reset()
    }
}