import QtQuick 2.5
import QtQuick.Window 2.2
import QtQuick.Layouts 1.1

import "minesweeper.js" as Minesweeper

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
        source: "qrc:/bg.png"
    }

    RowLayout {
      anchors.fill: parent
      spacing: 10

      Item{
          width:10
      }

      Grid {
          id: table
          columns: Minesweeper.dimension
          rows: columns

          Repeater {
              model: table.rows *  table.columns

              Button {
                  width: Math.max(16, (Math.min(window.width, window.height) / table.columns) - 8)
                  height: width
                  position: modelData
              }
          }
      }

      ColumnLayout {
        Item {
          height: 10
        }
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
        Item {
          Layout.fillHeight: true
        }
      }
    }
}
