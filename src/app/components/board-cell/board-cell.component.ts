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

  @Input()
  public toggled: boolean = false;

  @Output()
  public cellToggled = new EventEmitter<boolean>();

  public toggleCell() {
    this.toggled = !this.toggled;
    this.cell.toggled = this.toggled;
    this.cellToggled.emit();

    const board = localStorage.getItem('board');

    if (board) {
      const parsedBoard = JSON.parse(board);

      for (const column of parsedBoard) {
        for (const cell of column) {
          if (this.cell.song.title === cell.song.title) {
            cell.toggled = !cell.toggled;
            break;
          }
        }
      }

      localStorage.setItem('board', JSON.stringify(parsedBoard));
    }
  }
}
