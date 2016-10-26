pragma Singleton

import QtQml 2.2

import "../minesweeper.js" as Minesweeper

QtObject {
    property int minesFound: 0
    property bool gameIsRunning: true
    property var suspectedMines: []
    property var revealedFields: []

    signal gameIsWon()
    signal gameOver()

    function reset() {
        minesFound = 0;
        gameIsRunning = true
        suspectedMines = []
        revealedFields = []
    }

    function revealed(position) {
        revealedFields.push(position)
        checkIfGameIsWon()
    }

    onGameOver: gameIsRunning = false

    function suspectMine(position){
        suspectedMines.push(position)
        suspectedMinesChanged()

        checkIfGameIsWon();
    }
    function unsuspectMine(position){
        suspectedMines = suspectedMines.filter(function(a) { return a !== position;});
        suspectedMinesChanged()
    }
    function checkIfGameIsWon(){
        if (isGameWon()){
            gameIsRunning = false;
            gameIsWon();
        }
    }
    function isGameWon(){
        if (revealedFields.length + Minesweeper.mines.length === Minesweeper.dimension * Minesweeper.dimension) return true;
        if (suspectedMines.length === Minesweeper.mines.length){
            for(var i = 0; i < Minesweeper.mines.length; i++){
                if (suspectedMines.indexOf(Minesweeper.mines[i]) === -1){
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
