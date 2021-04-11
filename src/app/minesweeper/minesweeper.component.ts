import {
  Component,
  OnInit,
} from '@angular/core';
import { createGame } from './game';


@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss'],
})
export class MinesweeperComponent implements OnInit {
  game;

  constructor() {}

  ngOnInit(): void {
    // this.startNewGame();
  }

  startNewGame(){
    this.game = createGame({cols: 16, rows: 16, mines: 48});
  }
}
