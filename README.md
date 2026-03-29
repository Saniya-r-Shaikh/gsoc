# FSM to CircuitVerse Converter (PoC)

## Overview
This project converts a Finite State Machine (FSM) JSON into a CircuitVerse JSON circuit.

## Basic Idea
A Finite State Machine (FSM) consists of states and outputs.  
In this project:
- Each state is represented as an input switch  
- Outputs are represented using LEDs  
- Connections between them are created using nodes (wires)  

## File
`converter.js` – reads FSM JSON and generates CircuitVerse JSON  

## Input
`traffic.json` – FSM data  

## Output
`output.cv.json` – can be imported into CircuitVerse  

## Demo
[Add your video link here]

##  Future Improvements

* Add clock-based automation
* Implement FSM transitions using flip-flops
* Support Mealy machines
* Optimize circuit layout

##  Tech Stack

* JavaScript (Node.js)
* JSON
* CircuitVerse Simulator

