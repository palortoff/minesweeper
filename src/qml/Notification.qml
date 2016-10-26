import QtQuick 2.5

Text {
    function clear() {
        text= ""
    }

    function gameOver(){
        text = "Game Over"
        color= "red"
    }

    function gameIsWon(){
        text = "Congratulations!"
        color="yellow"
    }

    text: ""

    font.pixelSize: 25
}
