import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-lobby-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-lobby-dialog.component.html',
  styleUrl: './create-lobby-dialog.component.scss',
})
export class CreateLobbyDialogComponent {
  constructor(private readonly dialogRef: DialogRef) {}

  public name = new FormControl('');

  public submitName() {
    this.dialogRef.close(this.name.value);
  }
}
