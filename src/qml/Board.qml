import QtQuick 2.5
import QtQuick.Layouts 1.1

import "../minesweeper.js" as Minesweeper

Column {
    property int minDimension

    Loader {
        id: loader
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
          columns: Minesweeper.dimension
          rows: columns

          property bool inReveal: false;
          property var toReveal : []
          property int tileSize: Math.max(16, (minDimension / table.columns) - 8)

          function buttonIsSave(pos){
            var n = Minesweeper.neighbors(pos);
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

          signal revealPosition(var revealPos)

          Repeater {
              model: table.rows *  table.columns

              Button {
                  width:tileSize
                  height: tileSize
                  position: modelData
                  onIsSave: table.buttonIsSave(position)

                  Connections {
                      target: table
                      onRevealPosition: {
                        if (revealPos === position) reveal();
                      }
                  }
              }
          }
      }
    }
}
