'use strict';

const {isExplosivePosition, explosiveSiblingCount, setMines, allNeighbors, directNeighbors, getPosition, getColumn, getRow, getDimension, setDimension} = require('./minesweeper');
const {expect} = require('chai');

describe('Minesweeper', () => {
    describe('Dimension', () => {
        describe('when the dimension is set to 8', () => {
            let oldDimension;
            before(() => {
                oldDimension = getDimension();
                setDimension(8);
            });
            after(() => setDimension(oldDimension));
            it('the dimension is 8', () =>
                expect(getDimension()).to.eql(8)
            );
        });
    });

    describe('#getPosition', () => {
        let dimension = 4;
        let oldDimension;
        before(() => {
            oldDimension = getDimension();
            setDimension(dimension);
        });
        after(() => setDimension(oldDimension));

        for (let i = 0; i < dimension; ++i) {
            it(`${i} => ${i}`, () => {
                const row    = getRow(i);
                const column = getColumn(i);
                expect(getPosition(column, row)).to.eql(i);
            });
        }
    });

    describe('#allNneighbours', () => {
        let n;
        let pos;
        let dimension = 3;
        let oldDimension;
        before(() => {
            oldDimension = getDimension();
            setDimension(dimension);
        });
        after(() => setDimension(oldDimension));

        describe('for a field in the middle', () => {
            before(() => {
                pos = getPosition(1,1);
                n = allNeighbors(pos);
            });

            it('the top left neighbor is included        ', () => expect(n).to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is included       ', () => expect(n).to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is included     ', () => expect(n).to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor is included    ', () => expect(n).to.include(pos + dimension + 1));
        });

        describe('for a field in the left column', () => {
            before(() => {
                pos = getPosition(0,1);
                n = allNeighbors(pos);
            });

            it('the top left neighbor is not included    ', () => expect(n).to.not.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is included       ', () => expect(n).to.include(pos - dimension + 1));
            it('the left neighbor is not included        ', () => expect(n).to.not.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor nto is included ', () => expect(n).to.not.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor is included    ', () => expect(n).to.include(pos + dimension + 1));
        });

        describe('for a field in the right column', () => {
            before(() => {
                pos = getPosition(2,1);
                n = allNeighbors(pos);
            });

            it('the top left neighbor is included        ', () => expect(n).to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is not included   ', () => expect(n).to.not.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is not included       ', () => expect(n).to.not.include(pos + 1));
            it('the bottom left neighbor is included     ', () => expect(n).to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor is not included', () => expect(n).to.not.include(pos + dimension + 1));
        });

        describe('for a field in the top row', () => {
            before(() => {
                pos = getPosition(1,0);
                n = allNeighbors(pos);
            });

            it('the top left neighbor is not included    ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is not included         ', () => expect(n).not.to.include(pos - dimension));
            it('the top right neighbor is not included   ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is included     ', () => expect(n).to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor is included    ', () => expect(n).to.include(pos + dimension + 1));
        });
        describe('for a field in the bottom row', () => {
            before(() => {
                pos = getPosition(1,2);
                n = allNeighbors(pos);
            });

            it('the top left neighbor is included        ', () => expect(n).to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is included       ', () => expect(n).to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is not included ', () => expect(n).to.not.include(pos + dimension - 1));
            it('the bottom neighbor is not included      ', () => expect(n).to.not.include(pos + dimension));
            it('the bottom right neighbor is not included', () => expect(n).to.not.include(pos + dimension + 1));
        });
    });

    describe('#directNneighbours', () => {
        let n;
        let pos;
        let dimension = 3;
        let oldDimension;
        before(() => {
            oldDimension = getDimension();
            setDimension(dimension);
        });
        after(() => setDimension(oldDimension));

        describe('for a field in the middle', () => {
            before(() => {
                pos = getPosition(1,1);
                n = directNeighbors(pos);
            });

            it('the top left neighbor is not included        ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is included                 ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is not included       ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is included                ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included               ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is not included     ', () => expect(n).not.to.include(pos + dimension - 1));
            it('the bottom neighbor is included              ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor not is included    ', () => expect(n).not.to.include(pos + dimension + 1));
        });

        describe('for a field in the left column', () => {
            before(() => {
                pos = getPosition(0,1);
                n = directNeighbors(pos);
            });

            it('the top left neighbor is not included        ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is not included       ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is not included        ', () => expect(n).to.not.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is not included     ', () => expect(n).not.to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor not is included    ', () => expect(n).not.to.include(pos + dimension + 1));
        });

        describe('for a field in the right column', () => {
            before(() => {
                pos = getPosition(2,1);
                n = directNeighbors(pos);
            });

            it('the top left neighbor is not included        ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is not included       ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is not included       ', () => expect(n).to.not.include(pos + 1));
            it('the bottom left neighbor is not included     ', () => expect(n).not.to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor not is included    ', () => expect(n).not.to.include(pos + dimension + 1));
        });

        describe('for a field in the top row', () => {
            before(() => {
                pos = getPosition(1,0);
                n = directNeighbors(pos);
            });

            it('the top left neighbor is not included        ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is not included         ', () => expect(n).not.to.include(pos - dimension));
            it('the top right neighbor is not included       ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is not included     ', () => expect(n).not.to.include(pos + dimension - 1));
            it('the bottom neighbor is included          ', () => expect(n).to.include(pos + dimension));
            it('the bottom right neighbor not is included    ', () => expect(n).not.to.include(pos + dimension + 1));
        });
        describe('for a field in the bottom row', () => {
            before(() => {
                pos = getPosition(1,2);
                n = directNeighbors(pos);
            });

            it('the top left neighbor is not included        ', () => expect(n).not.to.include(pos - dimension - 1));
            it('the top neighbor is included             ', () => expect(n).to.include(pos - dimension));
            it('the top right neighbor is not included       ', () => expect(n).not.to.include(pos - dimension + 1));
            it('the left neighbor is included            ', () => expect(n).to.include(pos - 1));
            it('the right neighbor is included           ', () => expect(n).to.include(pos + 1));
            it('the bottom left neighbor is not included     ', () => expect(n).not.to.include(pos + dimension - 1));
            it('the bottom neighbor is not included      ', () => expect(n).to.not.include(pos + dimension));
            it('the bottom right neighbor not is included    ', () => expect(n).not.to.include(pos + dimension + 1));
        });
    });

    describe('#explosiveSiblingCount', () => {
        describe('when there is a single mine at field 1 on a 8x8 board', () => {
            let dimension = 8;
            let oldDimension;
            before(() => {
                oldDimension = getDimension();
                setDimension(dimension);
            });
            after(() => setDimension(oldDimension));
            before(() => setMines([1]));

            it('explosiveSiblingCount at  8 is 1', () => expect(explosiveSiblingCount( 8)).to.eql(1));
        });


        describe('when there is a single mine at field 12 on a 5x5 board', () => {
            let dimension = 5;
            let oldDimension;
            before(() => {
                oldDimension = getDimension();
                setDimension(dimension);
            });
            after(() => setDimension(oldDimension));
            before(() => setMines([12]));

            it('explosiveSiblingCount at  0 is 0', () => expect(explosiveSiblingCount( 0)).to.eql(0));
            it('explosiveSiblingCount at  1 is 0', () => expect(explosiveSiblingCount( 1)).to.eql(0));
            it('explosiveSiblingCount at  2 is 0', () => expect(explosiveSiblingCount( 2)).to.eql(0));
            it('explosiveSiblingCount at  3 is 0', () => expect(explosiveSiblingCount( 3)).to.eql(0));
            it('explosiveSiblingCount at  4 is 0', () => expect(explosiveSiblingCount( 4)).to.eql(0));
            it('explosiveSiblingCount at  5 is 0', () => expect(explosiveSiblingCount( 5)).to.eql(0));
            it('explosiveSiblingCount at  6 is 1', () => expect(explosiveSiblingCount( 6)).to.eql(1));
            it('explosiveSiblingCount at  7 is 1', () => expect(explosiveSiblingCount( 7)).to.eql(1));
            it('explosiveSiblingCount at  8 is 1', () => expect(explosiveSiblingCount( 8)).to.eql(1));
            it('explosiveSiblingCount at  9 is 0', () => expect(explosiveSiblingCount( 9)).to.eql(0));
            it('explosiveSiblingCount at 10 is 0', () => expect(explosiveSiblingCount(10)).to.eql(0));
            it('explosiveSiblingCount at 11 is 1', () => expect(explosiveSiblingCount(11)).to.eql(1));
            it('explosiveSiblingCount at 12 is 0', () => expect(explosiveSiblingCount(12)).to.eql(0));
            it('explosiveSiblingCount at 13 is 1', () => expect(explosiveSiblingCount(13)).to.eql(1));
            it('explosiveSiblingCount at 14 is 0', () => expect(explosiveSiblingCount(14)).to.eql(0));
            it('explosiveSiblingCount at 15 is 0', () => expect(explosiveSiblingCount(15)).to.eql(0));
            it('explosiveSiblingCount at 16 is 1', () => expect(explosiveSiblingCount(16)).to.eql(1));
            it('explosiveSiblingCount at 17 is 1', () => expect(explosiveSiblingCount(17)).to.eql(1));
            it('explosiveSiblingCount at 18 is 1', () => expect(explosiveSiblingCount(18)).to.eql(1));
            it('explosiveSiblingCount at 19 is 0', () => expect(explosiveSiblingCount(19)).to.eql(0));
            it('explosiveSiblingCount at 20 is 0', () => expect(explosiveSiblingCount(20)).to.eql(0));
            it('explosiveSiblingCount at 21 is 0', () => expect(explosiveSiblingCount(21)).to.eql(0));
            it('explosiveSiblingCount at 22 is 0', () => expect(explosiveSiblingCount(22)).to.eql(0));
            it('explosiveSiblingCount at 23 is 0', () => expect(explosiveSiblingCount(23)).to.eql(0));
            it('explosiveSiblingCount at 24 is 0', () => expect(explosiveSiblingCount(24)).to.eql(0));

            it('isExplosivePosition at  0 is false', () => expect(isExplosivePosition( 0)).to.be.false);
            it('isExplosivePosition at  1 is false', () => expect(isExplosivePosition( 1)).to.be.false);
            it('isExplosivePosition at  2 is false', () => expect(isExplosivePosition( 2)).to.be.false);
            it('isExplosivePosition at  3 is false', () => expect(isExplosivePosition( 3)).to.be.false);
            it('isExplosivePosition at  4 is false', () => expect(isExplosivePosition( 4)).to.be.false);
            it('isExplosivePosition at  5 is false', () => expect(isExplosivePosition( 5)).to.be.false);
            it('isExplosivePosition at  6 is false', () => expect(isExplosivePosition( 6)).to.be.false);
            it('isExplosivePosition at  7 is false', () => expect(isExplosivePosition( 7)).to.be.false);
            it('isExplosivePosition at  8 is false', () => expect(isExplosivePosition( 8)).to.be.false);
            it('isExplosivePosition at  9 is false', () => expect(isExplosivePosition( 9)).to.be.false);
            it('isExplosivePosition at 10 is false', () => expect(isExplosivePosition(10)).to.be.false);
            it('isExplosivePosition at 11 is false', () => expect(isExplosivePosition(11)).to.be.false);
            it('isExplosivePosition at 12 is true ', () => expect(isExplosivePosition(12)).to.be.true);
            it('isExplosivePosition at 13 is false', () => expect(isExplosivePosition(13)).to.be.false);
            it('isExplosivePosition at 14 is false', () => expect(isExplosivePosition(14)).to.be.false);
            it('isExplosivePosition at 15 is false', () => expect(isExplosivePosition(15)).to.be.false);
            it('isExplosivePosition at 16 is false', () => expect(isExplosivePosition(16)).to.be.false);
            it('isExplosivePosition at 17 is false', () => expect(isExplosivePosition(17)).to.be.false);
            it('isExplosivePosition at 18 is false', () => expect(isExplosivePosition(18)).to.be.false);
            it('isExplosivePosition at 19 is false', () => expect(isExplosivePosition(19)).to.be.false);
            it('isExplosivePosition at 20 is false', () => expect(isExplosivePosition(20)).to.be.false);
            it('isExplosivePosition at 21 is false', () => expect(isExplosivePosition(21)).to.be.false);
            it('isExplosivePosition at 22 is false', () => expect(isExplosivePosition(22)).to.be.false);
            it('isExplosivePosition at 23 is false', () => expect(isExplosivePosition(23)).to.be.false);
            it('isExplosivePosition at 24 is false', () => expect(isExplosivePosition(24)).to.be.false);
        });
    })
});