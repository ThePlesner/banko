import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './pages/home/home.component';
import { BoardCellComponent } from './components/board-cell/board-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HomeComponent,
    BoardCellComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
