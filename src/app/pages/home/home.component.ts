import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { BankoDialogComponent } from 'src/app/components/banko-dialog/banko-dialog.component';
import { BoardComponent } from 'src/app/components/board/board.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [BankoDialogComponent, BoardComponent, DialogModule],
})
export class HomeComponent implements OnInit {
  constructor(private readonly dialog: Dialog) {}

  ngOnInit(): void {}

  public showDialog() {
    this.dialog.open(BankoDialogComponent);
  }

  public reset() {
    localStorage.setItem('board', '');
  }
}
