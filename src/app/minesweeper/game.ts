// Credits to Christian Johansen for game logic:
// https://github.com/cjohansen/react-sweeper

import { Map, fromJS } from 'immutable';
import { shuffle, repeat, keep, prop } from './utils';

function initTiles(rows, cols, mines) {
  return shuffle(
    repeat(mines, { isMine: true, isRevealed: false }).concat(
      repeat(rows * cols - mines, { isRevealed: false })
    )
  ).map(function (tile, idx) {
    return { ...tile, id: idx };
  });
}

function onWEdge(game, tile) {
  return tile % game.cols === 0;
}

function onEEdge(game, tile) {
  return tile % game.cols === game.cols - 1;
}

function idx(game, tile) {
  if (tile < 0) {
    return null;
  }
  return game.tiles[tile] ? tile : null;
}

function nw(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile - game.cols - 1);
}

function n(game, tile) {
  return idx(game, tile - game.cols);
}

function ne(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile - game.cols + 1);
}

function e(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile + 1);
}

function se(game, tile) {
  return onEEdge(game, tile) ? null : idx(game, tile + game.cols + 1);
}

function s(game, tile) {
  return idx(game, tile + game.cols);
}

function sw(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile + game.cols - 1);
}

function w(game, tile) {
  return onWEdge(game, tile) ? null : idx(game, tile - 1);
}

const directions = [nw, n, ne, e, se, s, sw, w];

function neighbours(game, tile) {
  return keep(directions, function (dir) {
    return game.tiles[dir(game, tile)];
  });
}

function getMineCount(game, tile) {
  var nbs = neighbours(game, tile);
  return nbs.filter(prop('isMine')).length;
}

function isMine(game, tile) {
  return game.tiles[tile].isMine;
}

function isSafe(game) {
  const tiles = game.tiles;
  const mines = tiles.filter(prop('isMine'));
  return (
    mines.filter(prop('isRevealed')) === 0 &&
    tiles.length - mines.length === tiles.filter(prop('isRevealed')).length
  );
}

export function isGameOver(game) {
  return isSafe(game) || game.isDead;
}

function addThreatCount(game, tile) {
  game.tiles[tile].threatCount = getMineCount(game, tile);
  return game;
}

function revealAdjacentSafeTiles(game, tile) {
  if (isMine(game, tile)) {
    return game;
  }
  game = addThreatCount(game, tile);
  game.tiles[tile].isRevealed = true;
  if (game.tiles[tile].threatCount === 0) {
    return keep(directions, function (dir) {
      return dir(game, tile);
    }).reduce(function (game, pos) {
      return !game.tiles[pos].isRevealed
        ? revealAdjacentSafeTiles(game, pos)
        : game;
    }, game);
  }
  return game;
}

function attemptWinning(game) {
  return isSafe(game) ? (game.isSafe = true) : game;
}

function revealMine(tile) {
  return tile.isMine ? (tile.isRevealed = true) : tile;
}

function revealMines(game) {
  return game.tiles.map(function (tile) {
    return revealMine(tile);
  });
}

export function revealTile(game, tile) {
  if (game.tiles[tile]) {
    game.tiles[tile].isRevealed = true;
  }

  return isMine(game, tile)
    ? endGame(game)
    : attemptWinning(revealAdjacentSafeTiles(game, tile));
}

export function endGame(game) {
  game.isDead = true;
  revealMines(game);
  return game;
}

export function createGame(options) {
  return {
    cols: options.cols,
    rows: options.rows,
    playingTime: 0,
    tiles: initTiles(options.rows, options.cols, options.mines),
  };
}
