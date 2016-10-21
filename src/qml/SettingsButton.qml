import QtQuick 2.5

Rectangle {
    width: 30
    height: 30
    color: "lightgray"
    radius: 5

    signal clicked()

    Text {
        anchors.fill: parent
        font.pixelSize: height
        font.bold: true
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        text: qsTr("\u2699")
        color: "black"
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            parent.clicked()
        }
    }
}
