'use strict';

const {getPosition, getColumn, getRow, getDimension, setDimension, neighbors} = require('./minesweeper');

const {expect} = require('chai');

describe('Minesweeper', () => {
    describe('Dimension', () => {
        it('the initial dimension is 5', () =>
            expect(getDimension()).to.eql(5)
        );
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

    describe('neighbours', () => {
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
                n = neighbors(pos);
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
                n = neighbors(pos);
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
                n = neighbors(pos);
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
                n = neighbors(pos);
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
                n = neighbors(pos);
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

});