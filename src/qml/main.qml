import QtQuick 2.5
import QtQuick.Window 2.2
import QtQuick.Layouts 1.1
import "."
import "../minesweeper.js" as Minesweeper

Window {
    id: window
    visible: true
    width: 680
    height: 480
    title: qsTr("Minesweeper")


    function gameOver() {
        GameState.gameOver()
        topMenu.gameOver()
    }

    Image {
        id: background
        anchors.fill: parent
        asynchronous: true
        smooth: true
        source: "qrc:/images/bg.png"
    }

    ColumnLayout {
        id: main

        anchors {
            fill: parent
            margins: 10
        }
        spacing: 10

        TopMenu{
            id: topMenu
            onReload: {
                board.reload()
            }
        }

        Board {
            id: board
            Layout.fillHeight: true
            Layout.fillWidth: true

            onBombExploded: gameOver()
        }
    }
}
