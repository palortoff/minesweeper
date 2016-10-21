import QtQuick 2.5
import QtQuick.Layouts 1.1

import "../minesweeper.js" as Minesweeper

RowLayout{
  Text {
    id: bomb
    text: qsTr("\uD83D\uDCA3")
    color: "red"
    font.pixelSize: 25
  }
  Text {
    text: Minesweeper.mines.length
    color: "white"
    font.pixelSize: bomb.font.pixelSize
  }
}
