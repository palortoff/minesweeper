import QtQuick 2.5
import QtQml 2.2
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQml.StateMachine 1.0 as SMF
import "."

import "../minesweeper.js" as Minesweeper

Item {
    property int position: 0

    property alias backgroundColor : background.color
    property alias border : background.border
    property alias font : text.font

    property real initialStateOpacity : 0.9
    property color initialStateColor : "white"

    property real questionStateOpacity : 0.7
    property color questionStateColor : "blue"

    property real explodedStateOpacity : 0.6
    property color explodedStateColor : "darkred"
    property string mineChar: qsTr("\uD83D\uDCA3")

    property real mineNotFoundOpacity: 0.6
    property color mineNotFoundColor: "red"

    signal reveal()
    signal isSave(int position)

    QtObject {
        id: p;

        property bool isRightButton: true;
        property bool isExplosive: Minesweeper.isExplosivePosition(position);
        property int explosiveSiblingCount: Minesweeper.explosiveSiblingCount(position);

        function siblingCountButtonTextColor()
        {
            switch(explosiveSiblingCount) {
            case 1:
                return "blue";
            case 2:
                return "green";
            case 3:
                return "red";
            case 4:
                return "purple";
            case 5:
                return "maroon";
            case 6:
                return "cyan";
            case 7:
                return "black";
            case 8:
                return "gray";
            default:
                break;
            }

            return "white";
        }
    }

    SMF.StateMachine {
        id: stateMachine
        initialState: startState
        running: true

        SMF.State { id: startState
            onEntered: {
                text.text = ""
                text.color = initialStateColor
                background.opacity = initialStateOpacity
            }

            SMF.SignalTransition {
                targetState: suspectMineState
                signal: mousearea.onClicked
                guard: p.isRightButton && GameState.gameIsRunning
            }

            SMF.SignalTransition {
                targetState: explodeState
                signal: mousearea.onClicked
                guard: !p.isRightButton && p.isExplosive && GameState.gameIsRunning
            }

            SMF.SignalTransition {
                targetState: finalState
                signal: mousearea.onClicked
                guard: !p.isRightButton && !p.isExplosive && GameState.gameIsRunning
            }

            SMF.SignalTransition {
                targetState: finalState
                signal: reveal
            }

            SMF.SignalTransition{
                targetState: mineNotFoundState
                guard: p.isExplosive
                signal: GameState.gameOver
            }
        }
        SMF.State { id: questionState
            onEntered: {
                text.text = qsTr("?")
                text.color = questionStateColor
                background.opacity = questionStateOpacity
            }

            SMF.SignalTransition {
                targetState: startState
                signal: mousearea.onClicked
                guard: p.isRightButton && GameState.gameIsRunning
            }
        }
        SMF.State { id: suspectMineState
            onEntered: {
                text.text = qsTr("X")
                text.color = questionStateColor
                background.opacity = questionStateOpacity
                GameState.suspectMine(position)
            }
            onExited: {
                GameState.unsuspectMine(position)
            }
            SMF.SignalTransition {
                targetState: questionState
                signal: mousearea.onClicked
                guard: p.isRightButton && GameState.gameIsRunning
            }
            SMF.SignalTransition {
                targetState: suspicionConfirmed
                signal: GameState.gameOver
                guard: p.isExplosive && GameState.gameIsRunning
            }
            SMF.SignalTransition {
                targetState: suspicionConfirmed2
                signal: GameState.gameIsWon
                guard: p.isExplosive
            }
            SMF.SignalTransition {
                targetState: suspicionDisproved
                signal: GameState.gameOver
                guard: !p.isExplosive && GameState.gameIsRunning
            }
        }
        SMF.State { id: suspicionConfirmed2
            onEntered: {
                text.text = "X" // TODO: move up
                text.color = "green"
                background.opacity = questionStateOpacity
            }
        }
        SMF.State { id: suspicionConfirmed
            onEntered: {
                text.text = mineChar // TODO: move up
                text.color = "green"
                background.opacity = questionStateOpacity
            }
        }
        SMF.State { id: suspicionDisproved
            onEntered: {
                text.text = qsTr("X") // TODO: move up
                text.color = "red"
                background.opacity = questionStateOpacity
            }
        }
        SMF.State { id: explodeState
            SequentialAnimation {
                id: explodeStateAnimator

                ParallelAnimation {
                    ScaleAnimator {
                        target: text
                        from: 1.2
                        to: 0.8
                        easing.type: Easing.InBounce
                        duration: 400
                    }
                    RotationAnimator {
                        target: text
                        from: -15
                        to: 15
                        duration: 400
                    }
                }

                ParallelAnimation {
                    ScaleAnimator {
                        target: text
                        from: 0.8
                        to: 1.2
                        easing.type: Easing.OutBounce
                        duration: 400
                    }
                    RotationAnimator {
                        target: text
                        from: 15
                        to: -15
                        duration: 400
                    }
                }

                running: false
                loops: Animation.Infinite
            }

            onEntered: {
                text.text = mineChar
                text.color = explodedStateColor
                background.opacity = explodedStateOpacity
                explodeStateAnimator.running = true
                GameState.gameOver()
            }
        }
        SMF.State { id: mineNotFoundState

            onEntered: {
                text.text  = mineChar
                text.color = mineNotFoundColor
                background.opacity = mineNotFoundOpacity
            }
        }
        SMF.State { id: finalState

            onEntered: {
                text.text = p.explosiveSiblingCount
                text.visible = p.explosiveSiblingCount > 0
                text.color = p.siblingCountButtonTextColor()
                background.opacity = p.explosiveSiblingCount === 0 ? 0.25 : 0.5
                if (p.explosiveSiblingCount == 0) {
                  isSave(position)
                }
            }
        }
    }

    Rectangle {
        id: background
        anchors.fill: parent
        radius: 3

        color: "lightgray"
        border.color: "black"
        border.width: 1

        Behavior on opacity {
            NumberAnimation {
                duration: 250
            }
        }
    }
    Text {
        id: text
        anchors.fill: parent
        font.pixelSize: height * 0.7
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter

        Behavior on color {
            ColorAnimation {
                duration: 1500
            }
        }
    }
    MouseArea {
        id: mousearea;
        anchors.fill: parent
        acceptedButtons: Qt.LeftButton | Qt.RightButton

        onClicked: {
            p.isRightButton = mouse.button == Qt.RightButton
        }
    }
    ParallelAnimation {
        id: startupAnimation
        running: false

        NumberAnimation {
            target: background
            property: "rotation"

            from: 0
            to: 360
            easing.type: Easing.OutBounce
            duration: Minesweeper.randomInt(500, 400)
        }

        ColorAnimation {
            target: background
            property: "color"

            from: Qt.rgba(Math.random(),Math.random(),Math.random(),1)
            to: backgroundColor
            duration: Minesweeper.randomInt(500, 400)
        }
    }
    Component.onCompleted: {
      startupAnimation.start()
    }
}
