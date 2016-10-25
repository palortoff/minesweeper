import QtQuick 2.5

Text {
    function clear() {
        text= ""
    }

    function gameOver(){
        text = "Game Over"
        color= "red"
    }

    text: ""

    font.pixelSize: 25
}
