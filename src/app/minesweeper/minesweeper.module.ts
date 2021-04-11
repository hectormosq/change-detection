import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileComponent } from './tile/tile.component';
import { MinesweeperComponent } from './minesweeper.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [MinesweeperComponent, TileComponent, BoardComponent],
  imports: [CommonModule],
})
export class MinesweeperModule {}
