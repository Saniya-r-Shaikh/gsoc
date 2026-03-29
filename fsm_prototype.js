// FSM SYNTHESIZER PROTOTYPE
// Prototype for FSM → State Table → Encoding → Truth Table -> Boolean Equation

// 1. FSM INPUT DATA (only for prototype testing)
// TODO : Replace this object with a dynamic parser that reads the canvas
const fsm = {
  states: ["A", "B"],
  inputs: [0, 1],
  transitions: [
    { current: "A", input: 0, next: "A" },
    { current: "A", input: 1, next: "B" },
    { current: "B", input: 0, next: "A" },
    { current: "B", input: 1, next: "B" }
  ]
};


// 2. GENERATING STATE TABLE
// Converting canvas objects into a State Table 
function generateStateTable(fsm) {

  console.log("\nSTATE TABLE");
  console.log("Current State | Input | Next State");

  //displaying the state table
  fsm.transitions.forEach(t => {
    console.log(`${t.current}      | ${t.input}     | ${t.next}`);
  });

}


// 3. STATE ENCODING : Giving  Binary Values To States
function encodeStates(states) {

  // Calculating No. Of FlipFlops
  const bits = Math.ceil(Math.log2(states.length));

  const encoding = {};

  states.forEach((state, index) => {
    // Giving a Binary Value Of Same Length To Each State
    const binary = index.toString(2).padStart(bits, "0");

    encoding[state] = binary;
  });

  return encoding;

}


// 4. GENERATING TRUTH TABLE
function generateTruthTable(fsm, encoding) {

  console.log("\nTRUTH TABLE (BINARY)");
  console.log("State | Input | Next");

  const truthTable = [];

  fsm.transitions.forEach(t => {

    const current = encoding[t.current];
    const next = encoding[t.next];

    console.log(`${current}     | ${t.input}     | ${next}`);

    // Storing the data in an array
    truthTable.push({
      state: current,
      input: t.input,
      next: next
    });

  });

  return truthTable;

}

// 5. SIMPLE BOOLEAN EQUATION
function generateEquation(truthTable) {
  console.log("\nBOOLEAN EQUATION:");

  //initially sets true
  let matchesInput = true;

  truthTable.forEach(row => {
    // checks for the input value => if matches then -> true ; ELSE -> false
    if (row.next !== String(row.input)) {
      matchesInput = false;
    }

  });

  if (matchesInput) {
    console.log("Next State = Input");
  } else {
    console.log("Equation detection not implemented for this case");
  }

}


// 6. RUN PIPELINE =>> connecting all parts
console.log("\nFSM SYNTHESIZER PROTOTYPE");

// Displays the users State Table
generateStateTable(fsm);

// Assigning binary ID to every State
const encoding = encodeStates(fsm.states);

console.log("\nSTATE ENCODING");

for (let state in encoding) {
  console.log(`${state} → ${encoding[state]}`);
}

// Generating Truth Table
const truthTable = generateTruthTable(fsm, encoding);

// Generating Equation
generateEquation(truthTable);