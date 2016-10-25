.pragma library

var dimension = 8;
var mines;

initMinesweeper();

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initMinesweeper() {
    var count = 5;
    mines     = [];

    if (0) {
      mines     = [1,15,50];
    }
    else {
      while (mines.length < count) {
          var newMine = randomInt(0, dimension * dimension - 1);
          if (mines.indexOf(newMine) === -1) mines.push(newMine);
      }
    }

    console.log(mines);
    return mines;
}

function isExplosivePosition(position) {
    return mines.indexOf(position) >= 0;
}

function explosiveSiblingCount(position) {
    var count = 0;
    var n = allNeighbors(position);

    n.forEach(function (p) {
        if (isExplosivePosition(p)){
            count++;
        }
    });

    return count;
}

function directNeighbors(p) {
    return neighbors(p);
}

function allNeighbors(p) {
    return neighbors(p, true);
}

function neighbors(p, includeDiagonal) {
    var neighbors = [];
    var row       = getRow(p);
    var col       = getColumn(p);

    var isLeftCol  = col === 0;
    var isRightCol = col === dimension - 1;
    var isTop      = row === 0;
    var isBottom   = row === dimension - 1;

    if (!isTop) {
        if (includeDiagonal) if (!isLeftCol) neighbors.push(getPosition(col - 1, row - 1));
        neighbors.push(getPosition(col, row - 1));
        if (includeDiagonal)  if (!isRightCol) neighbors.push(getPosition(col + 1, row - 1));
    }
    if (!isLeftCol) neighbors.push(getPosition(col - 1, row));
    if (!isRightCol) neighbors.push(getPosition(col + 1, row));

    if (!isBottom) {
        if (includeDiagonal)  if (!isLeftCol) neighbors.push(getPosition(col - 1, row + 1));
        neighbors.push(getPosition(col, row + 1));
        if (includeDiagonal)  if (!isRightCol) neighbors.push(getPosition(col + 1, row + 1));
    }
    return neighbors;
}

function getRow(pos) {
    return Math.floor(pos / dimension);
}

function getColumn(pos) {
    return pos % dimension;
}

function getPosition(x, y) {
    return x + dimension * y;
}

function setDimension(d) {
    dimension = d;
}

if (typeof module !== "undefined") {
    module.exports = {
        setDimension         : setDimension,
        getDimension         : function () {
            return dimension;
        },
        getRow               : getRow,
        getColumn            : getColumn,
        getPosition          : getPosition,
        directNeighbors      : directNeighbors,
        allNeighbors         : allNeighbors,
        setMines             : function (m) {
            mines = m
        },
        explosiveSiblingCount: explosiveSiblingCount,
        isExplosivePosition  : isExplosivePosition
    };
}