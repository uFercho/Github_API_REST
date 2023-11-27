import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {
  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, type: string = 'save', action: string = "", duration: number = 3000) {
    this.matSnackBar.open(message, action,{
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar', type]
    });
  }

}
