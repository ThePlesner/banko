import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { BankoDialogComponent } from 'src/app/components/banko-dialog/banko-dialog.component';
import { BoardComponent } from 'src/app/components/board/board.component';
import { NgClass } from '@angular/common';

interface RoundButton {
  id: number;
  label: string;
  toggled: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [BankoDialogComponent, BoardComponent, DialogModule, NgClass],
})
export class HomeComponent implements OnInit {
  public toggledId: number = 1;

  public roundButtons = [
    {
      id: 1,
      label: 'Runde 1',
      toggled: true,
    },
    {
      id: 2,
      label: 'Runde 2',
      toggled: false,
    },
    {
      id: 3,
      label: 'Runde 3',
      toggled: false,
    },
  ];

  constructor(private readonly dialog: Dialog) {}

  ngOnInit(): void {}

  public showDialog() {
    this.dialog.open(BankoDialogComponent);
  }

  public reset() {
    localStorage.setItem('board', '');
  }

  public toggleRoundButton(button: RoundButton) {
    if (button.id === 1) {
      this.roundButtons[0].toggled = true;
      this.roundButtons[1].toggled = false;
      this.roundButtons[2].toggled = false;
      this.toggledId = 1;
    } else if (button.id === 2) {
      this.roundButtons[0].toggled = false;
      this.roundButtons[1].toggled = true;
      this.roundButtons[2].toggled = false;
      this.toggledId = 2;
    } else if (button.id === 3) {
      this.roundButtons[0].toggled = false;
      this.roundButtons[1].toggled = false;
      this.roundButtons[2].toggled = true;
      this.toggledId = 3;
    }
  }
}
