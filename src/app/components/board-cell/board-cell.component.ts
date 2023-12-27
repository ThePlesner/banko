import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SongCell } from '../board/board.component';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BoardCellComponent {
  @Input()
  public cell!: SongCell;

  @Output()
  public cellToggled = new EventEmitter<boolean>();

  public toggled: boolean = false;

  public toggleCell() {
    this.toggled = !this.toggled;
    this.cell.toggled = this.toggled;
    this.cellToggled.emit();
  }
}
