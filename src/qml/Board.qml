import QtQuick 2.5
import QtQuick.Layouts 1.1

import "../minesweeper.js" as Minesweeper

Item {
    id: root

    signal bombExploded()

    Loader {
        id: loader
        anchors.centerIn: root
        sourceComponent: board
        active: true
    }

    function reload() {
        Minesweeper.initMinesweeper();
        loader.active = false
        loader.active = true
    }

    Component {
      id: board

      Grid {
          id: table

          signal revealPosition(var revealPos)

          columns: Minesweeper.dimension
          rows: columns

          property bool inReveal: false;
          property var toReveal : []
          property int tileSize: Math.max(Math.min(root.height, root.width) / table.columns, 16)

          function buttonIsSave(pos){
            var n = Minesweeper.directNeighbors(pos);
            n.forEach(function(p){toReveal.push(p);});

            if (!inReveal)
            {
              inReveal = true;
              var next = toReveal.pop();
              for(; next !== undefined; next = toReveal.pop()) {
                revealPosition(next);
              }
              inReveal = false;
            }
          }


          Repeater {
              model: table.rows *  table.columns

              Button {
                  width:tileSize
                  height: tileSize
                  position: modelData

                  onIsSave: table.buttonIsSave(position)
                  onExploded: bombExploded()

                  Connections {
                      target: table
                      onRevealPosition: {
                        if (revealPos === position) reveal();
                      }
                  }
                  Connections {
                      target: root
                      onBombExploded: gameOver()
                  }
              }
          }
      }
    }
}
