import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banko-dialog',
  standalone: true,
  imports: [],
  templateUrl: './banko-dialog.component.html',
  styleUrl: './banko-dialog.component.scss',
})
export class BankoDialogComponent {
  constructor(private readonly dialogRef: DialogRef) {}

  public dismiss() {
    this.dialogRef.close();
  }
}
