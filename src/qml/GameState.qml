pragma Singleton

import QtQml 2.2

QtObject {
    property int minesFound: 0
    property bool gameIsRunning: true

    function reset() {
        minesFound = 0;
        gameIsRunning = true
    }

    function gameOver() {
        gameIsRunning = false
    }
}
