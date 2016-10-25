import QtQuick 2.5
import "."

Rectangle {
    width: 30
    height: 30
    color: "red"
    radius: 5

    signal clicked()

    Text {
        anchors.fill: parent
        font.pixelSize: height
        font.bold: true
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        text: qsTr("\u21BB")
        color: "yellow"
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            GameState.reset()
            parent.clicked()
        }
    }
}
