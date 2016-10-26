import QtQuick 2.5
import QtQuick.Layouts 1.1
import "."

import "../minesweeper.js" as Minesweeper

RowLayout{
    Text {
        id: mine
        text: qsTr("\uD83D\uDCA3")
        color: "red"
        font.pixelSize: 25
    }
    Text {
        id: count
        text: Minesweeper.mines.length - GameState.suspectedMines.length
        color: "white"
        font.pixelSize: mine.font.pixelSize
    }
}
