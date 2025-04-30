import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgIf } from "@angular/common";

@Component({
    standalone: true,
    templateUrl: './edit-user-dialog.component.html',
    styleUrl: './edit-user-dialog.component.scss',
    imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogClose]
})
export class EditUserDialogComponent {
    readonly data = inject(MAT_DIALOG_DATA)

    public formUser = new FormGroup({
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(3)])
    })

    get userWithUpdatedFields() {
        return {
            ...this.formUser.value,
            id: this.data.user.id
        }
    }
}