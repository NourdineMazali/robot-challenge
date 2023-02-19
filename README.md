# AI-Media challenge

Hi! This repository contains my submission to the AI-Media challenge, built with typescript.  

## Technologies
- Typescript

## Dependencies
- typescript
- jest
- yargs

## Installation

1. Clone the repository.

```
 git clone https://github.com/NourdineMazali/robot-challenge.git
```

2. Install dependencies.

```
npm install
```

## How to use the app
To run the app use following command:
```
    npm run start -- -c path-to-commands-file

    e.g. npm run start -- -c ./commands.sample.txt
```
You can see sample commands file `commands.sample.txt`

## Run tests

In the folder, run:

```
npm test
```

## Description:

## Instructions

 • A toy robot moving on a square tabletop, of dimensions 5 units x 5 units.
 • There are no other obstructions on the table surface. The robot is free to roam around the surface of the table but must be prevented from       falling to destruction.
 • Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
 • All commands should be discarded until a valid place command has been executed.

## Commands

All commands should provide output indicating whether or not they succeeded.

 • PLACE X,Y,DIRECTION X and Y are integers that indicate a location on the tabletop.
    
    DIRECTION is a string indicating which direction the robot should face. It it one of the four cardinal directions: NORTH, EAST, SOUTH or WEST.
 
 • MOVE
    
    Instructs the robot to move 1 square in the direction it is facing.
 
 • LEFT
    
    Instructs the robot to rotate 90° anticlockwise/counterclockwise.
 
 • RIGHT
    Instructs the robot to rotate 90° clockwise.
 
 • REPORT
    Outputs the robot's current location on the tabletop and the direction it is facing.

## Constraints

The toy robot must not fall off the table during movement. This also includes
the initial
placement of the toy robot.
Any move that would cause the robot to fall must be ignored.
