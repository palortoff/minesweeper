import QtQuick 2.5
import QtQuick.Window 2.2
import QtQuick.Layouts 1.1

import "../minesweeper.js" as Minesweeper

Window {
    id: window
    visible: true
    width: 680
    height: 480
    title: qsTr("Minesweeper")

    Image {
        id: background
        anchors.fill: parent
        asynchronous: true
        smooth: true
        source: "qrc:/images/bg.png"
    }

    RowLayout {
      anchors.fill: parent
      spacing: 10

      Item{
          width:10
      }

      Board {
          id: board
          minDimension: Math.min(window.width, window.height)
      }

      ColumnLayout {
        spacing: 10
        Item {
          height: 10
        }

        BombCount {}

        RestartButton {
            onClicked: board.reload()
        }

        Item {
          Layout.fillHeight: true
        }
      }
    }
}
