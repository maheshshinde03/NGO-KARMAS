import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '@shared/component/toast/toast.component';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private snackBar: MatSnackBar) { }

    open(message: string, type: string): void {
        this.snackBar.openFromComponent(ToastComponent, {
            data: { message, type },
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            duration: 6000
        });
    }
}
