import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Song } from 'src/app/services/data';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { CommonModule } from '@angular/common';
import { map, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private readonly boardService: BoardService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  public checkBoard() {
    this.board.forEach((column) => {
      if (column.every((cell) => cell.toggled)) {
        this.hasColumnBingo.emit();
      }
    });
  }

  private initialize() {
    const boards = localStorage.getItem('boards');
    let parsedBoards: { [key: string]: SongCell[][] } = {};

    if (boards) {
      parsedBoards = JSON.parse(boards);
    }

    const id = (this.route.snapshot.params['id'] as string) ?? '';

    let board = undefined;

    if (boards && parsedBoards[id]) {
      board = parsedBoards[id];
    }

    if (board) {
      this.board = board;
    } else {
      this.boardService
        .getRandomboard()
        .pipe(
          take(1),
          map((board) => {
            return board.map((column) =>
              column.map((cell) => {
                return {
                  song: cell,
                  toggled: false,
                };
              })
            );
          }),
          tap((board) => {
            this.board = board;

            if (parsedBoards) {
              parsedBoards[id] = this.board;
            }

            localStorage.setItem('boards', JSON.stringify(parsedBoards));
          })
        )
        .subscribe();
    }
  }
}
