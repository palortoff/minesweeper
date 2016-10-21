// 'use strict';
.pragma library

var dimension = 8;
var mines

initMinesweeper();

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initMinesweeper() {
    console.log('initMinesweeper');
    mines = [];
    var count =5;//randomInt(1, dimension * dimension / 2);


    while (mines.length < count) {
        var newMine = randomInt(0, dimension * dimension - 1);
        if (mines.indexOf(newMine) === -1) mines.push(newMine);
    }

    console.log(mines);

    return mines;
}

function isExplosivePosition(position) {
    return mines.indexOf(position) >= 0;
}

function explosiveSiblingCount(position) {
    console.log('explosiveSiblingCount')
    var count = 0;

    // check the previous cell if this cell is not the first cell in this row
    function leftNeighborhood(position) {
        if (position % dimension != 0) {
            return isExplosivePosition(position - 1) ? 1 : 0;
        }

        return 0;
    }

    // check the next cell if this cell is not the last cell in this row
    function rightNeighborhood(position) {
        if ((position + 1) % dimension != 0) {
            return isExplosivePosition(position + 1) ? 1 : 0;
        }

        return 0;
    }

    count += leftNeighborhood(position);
    count += rightNeighborhood(position);

    // check cells above this one
    if (position > dimension) {
        count += isExplosivePosition(position - dimension) ? 1 : 0;
        count += leftNeighborhood(position - dimension);
        count += rightNeighborhood(position - dimension);
    }

    // check cells below this one
    if (position + dimension < dimension * dimension) {
        count += isExplosivePosition(position + dimension) ? 1 : 0;
        count += leftNeighborhood(position + dimension);
        count += rightNeighborhood(position + dimension);
    }

    return count;
}

function isNeighbor(a, b) {
    return neighbors(a).indexOf(b) !== -1;
}

function neighbors(p) {
    var neighbors = [];
    var row       = getRow(p);
    var col       = getColumn(p);

    var isLeftCol  = col === 0;
    var isRightCol = col === dimension - 1;
    var isTop      = row === 0;
    var isBottom   = row === dimension - 1;

    if (!isTop) {
        // if (!isLeftCol) neighbors.push(getPosition(col - 1, row - 1));
        neighbors.push(getPosition(col, row - 1));
        // if (!isRightCol) neighbors.push(getPosition(col + 1, row - 1));
    }
    if (!isLeftCol) neighbors.push(getPosition(col - 1, row));
    if (!isRightCol) neighbors.push(getPosition(col + 1, row));

    if (!isBottom) {
        // if (!isLeftCol) neighbors.push(getPosition(col - 1, row + 1));
        neighbors.push(getPosition(col, row + 1));
        // if (!isRightCol) neighbors.push(getPosition(col + 1, row + 1));
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

module.exports = {
    neighbors   : neighbors,
    setDimension: setDimension,
    getDimension: function () {
        return dimension;
    },
    getRow      : getRow,
    getColumn   : getColumn,
    getPosition : getPosition,
    isNeighbor  : isNeighbor
};
