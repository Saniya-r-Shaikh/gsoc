const fs = require("fs");

function fsmToCircuitVerse(fsm) {
  let nodeId = 0;
  let yPositions = [0, 80, 160];


  const circuit = JSON.parse(fs.readFileSync("base.json"));
  const scope = circuit.scopes[0];

  scope.allNodes = [];
  scope.Input = [];
  scope.VariableLed = [];
  scope.nodes = [];

  fsm.states.forEach((state, index) => {
    const y = yPositions[index];

    Object.entries(state.output).forEach(([color, value]) => {
      if (value === 1) {

        const n1 = {
          id: nodeId++,
          x: -40,
          y: 0,
          type: 0,
          bitWidth: 1,
          connections: [nodeId]
        };

        const n2 = {
          id: nodeId++,
          x: 10,
          y: 0,
          type: 1,
          bitWidth: 1,
          connections: [n1.id]
        };

        scope.allNodes.push(n1, n2);
        scope.nodes.push(n1.id, n2.id);

        scope.Input.push({
          x: -300,
          y: y,
          objectType: "Input",
          label: state.name,
          direction: "RIGHT",
          labelDirection: "LEFT",
          propagationDelay: 0,
          customData: {
            nodes: { output1: n2.id },
            values: { state: 1 },
            constructorParamaters: ["RIGHT", 1]
          }
        });

        scope.VariableLed.push({
          x: -150,
          y: y,
          objectType: "VariableLed",
          label: color.toUpperCase(),
          direction: "UP",
          labelDirection: "DOWN",
          propagationDelay: 10,
          customData: {
            nodes: { inp1: n1.id },
            constructorParamaters: [color]
          },
          subcircuitMetadata: {
            showInSubcircuit: false,
            showLabelInSubcircuit: true,
            labelDirection: "DOWN",
            x: 0,
            y: 0
          }
        });
      }
    });
  });

  return circuit;
}

const fsm = JSON.parse(fs.readFileSync("traffic.json"));
const result = fsmToCircuitVerse(fsm);

fs.writeFileSync("output.cv.json", JSON.stringify(result, null, 2));

console.log(" Successful!!! Generated output.cv.json");