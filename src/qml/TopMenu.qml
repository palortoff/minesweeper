import QtQuick 2.5
import QtQuick.Layouts 1.1
import "."

RowLayout {
    id: topMenu

    signal reload()

    Connections {
        target: GameState
        onGameIsWon: notification.gameIsWon()
        onGameOver: notification.gameOver()
    }

    onReload: notification.clear()

    anchors.margins: 10
    Layout.fillWidth: true
    MineCount {}
    Item { Layout.fillWidth: true }
    Notification {
        id: notification
    }
    Item { Layout.fillWidth: true }
    RestartButton { onClicked: reload() }
}
