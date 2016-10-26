pragma Singleton

import QtQml 2.2

import "../minesweeper.js" as Minesweeper

QtObject {
    property int minesFound: 0
    property bool gameIsRunning: true
    property var suspectedMines : []

    signal gameIsWon()

    function reset() {
        minesFound = 0;
        gameIsRunning = true
        suspectedMines = []
    }

    function gameOver() {
        gameIsRunning = false
    }

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
