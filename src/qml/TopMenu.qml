import QtQuick 2.5
import QtQuick.Layouts 1.1

RowLayout {
    id: topMenu

    signal reload()

    function gameOver(){
        notification.gameOver()
    }

    onReload: notification.clear()

    anchors.margins: 10
    Layout.fillWidth: true
    BombCount {}
    Item { Layout.fillWidth: true }
    Notification {
        id: notification
    }
    Item { Layout.fillWidth: true }
    RestartButton { onClicked: reload() }
}
