import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { Song } from 'src/app/services/data';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: Song[][] = [];

  constructor(private readonly boardService: BoardService) {}

  ngOnInit(): void {
    this.board = this.boardService.getRandomboard();
    console.log(this.board);
  }
}
