import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Song } from 'src/app/services/data';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { CommonModule, NgClass } from '@angular/common';

export interface SongCell {
  song: Song;
  toggled: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [BoardCellComponent, CommonModule, NgClass],
})
export class BoardComponent implements OnInit {
  @Input()
  public roundId: number = 1;

  @Output()
  public hasColumnBingo = new EventEmitter();

  public board: SongCell[][] = [];

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.initialize();
  }

  public checkBoard() {
    let bingoCounter = 0;
    for (const column of this.board) {
      if (column.every((cell) => cell.toggled)) {
        bingoCounter++;
      }
      if (bingoCounter === this.roundId) {
        this.hasColumnBingo.emit();
        break;
      }
    }
  }

  private initialize() {
    const board = localStorage.getItem('board');

    if (board) {
      this.board = JSON.parse(board);
    } else {
      this.board = this.boardService.getRandomboard().map((column) =>
        column.map((song) => {
          return {
            song,
            toggled: false,
          };
        })
      );
      localStorage.setItem('board', JSON.stringify(this.board));
    }
  }
}
