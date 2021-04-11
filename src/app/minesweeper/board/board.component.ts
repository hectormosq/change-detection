import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { List } from 'immutable';
import { isGameOver, revealTile } from '../game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnChanges {
  @Input() game: any;
  rows;
  history = List();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Only update game when game has actually changed
    if (changes.hasOwnProperty('game')) {
      this.updateGame();
    }
  }

  getTiles() {
    const game = this.game ? this.game.get('tiles') : [];
    console.log(game);
    return game
  }

  updateGame(updateHistory = true) {
    this.history = this.history.push(this.game);
  }

  handleTileClick(tile) {
    if (!tile) {
      return;
    }
    if (isGameOver(this.game)) {
      return;
    }
    const newGame = revealTile(this.game, tile.get('id'));
    if (newGame !== this.game) {
      this.game = newGame;
      this.updateGame();
    }
    if (isGameOver(this.game)) {
      window.alert('GAME OVER!');
    }
  }

  undo() {
    if (this.canUndo()) {
      this.history = this.history.pop();
      this.game = this.history.last();

      // Don't update the history so we don't end up with
      // the same game twice in the end of the list
      this.updateGame(false);
    }
  }

  canUndo() {
    return this.history.size > 1;
  }
}
