import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board-cell',
  templateUrl: './board-cell.component.html',
  styleUrls: ['./board-cell.component.scss'],
})
export class BoardCellComponent {
  @Input()
  public songTitle: string = '';

  public toggled: boolean = false;

  public toggleCell() {
    this.toggled = !this.toggled;
  }
}
