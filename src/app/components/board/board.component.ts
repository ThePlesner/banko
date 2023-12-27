import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Song } from 'src/app/services/data';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { CommonModule } from '@angular/common';

export interface SongCell {
  song: Song;
  toggled: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  standalone: true,
  imports: [BoardCellComponent, CommonModule],
})
export class BoardComponent implements OnInit {
  @Output()
  public hasColumnBingo = new EventEmitter();

  public board: SongCell[][] = [];

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.initialize();
  }

  public checkBoard() {
    console.log(this.board);
    this.board.forEach((column) => {
      if (column.every((cell) => cell.toggled)) {
        this.hasColumnBingo.emit();
      }
    });
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
