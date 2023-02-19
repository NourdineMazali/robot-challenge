import Robot from './Robot';
import Direction from './Direction';

const expectRobotToBeInInitState = (robot: Robot) => {
    expect(robot.getCurrentX()).toBeUndefined();
    expect(robot.getCurrentY()).toBeUndefined();
    expect(robot.getCurrentDirection()).toBeUndefined();
};

describe('Robot', () => {
    let robot: Robot;
    const consoleLogSpy = jest.spyOn(global.console, 'log');

    beforeEach(() => {
        robot = new Robot(5);
    });

    describe('place()', () => {
        describe('When robot place outside of the table with coordinates smaller than 0', () => {
            it('Should not change the robot coordinates', () => {
                robot.place(-1, -1, 'EAST')
                expectRobotToBeInInitState(robot);
            });
        });

        describe('When robot placed outside of the table with coordinates bigger than table size', () => {
            it('Should not change the robot coordinates', () => {
                robot.place(5, 5, 'EAST')
                expectRobotToBeInInitState(robot);
            });
        });

        describe('When robot coordinates are not valid types', () => {
            it('Should not change the robot coordinates', () => {
                // @ts-ignore
                robot.place('string', 0, 'NORTH')
                expectRobotToBeInInitState(robot);
            });
        });

        describe('When robot coordinates are on the table', () => {
            it('Should change the robot coordinates', () => {
                robot.place(4, 0, 'EAST')

                expect(robot.getCurrentX()).toEqual(4);
                expect(robot.getCurrentY()).toEqual(0);
                expect(robot.getCurrentDirection()).toEqual(new Direction('EAST'));
            });
        });
    });


    describe('left()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.left();
                expectRobotToBeInInitState(robot);
            });
        });

        const tests = [
            {
                args: [0, 0, 'NORTH'],
                expectedFacing: new Direction('WEST')
            },
            {
                args: [0, 0, 'WEST'],
                expectedFacing: new Direction('SOUTH')
            },
            {
                args: [0, 0, 'SOUTH'],
                expectedFacing: new Direction('EAST')
            },
            {
                args: [0, 0, 'EAST'],
                expectedFacing: new Direction('NORTH')
            }
        ];

        tests.forEach(({ args, expectedFacing }) => {
            describe('When robot is placed', () => {
                beforeEach(() => {
                    // @ts-ignore
                    robot.place(...args);
                });

                it(`Should rotate from ${args[2]} to ${expectedFacing}`, () => {
                    robot.left();
                    expect(robot.getCurrentDirection()).toEqual(expectedFacing);
                });

                it('Should not change robot position', () => {
                    expect(robot.getCurrentX()).toEqual(args[0]);
                    expect(robot.getCurrentY()).toEqual(args[1]);
                });
            });
        });
    });

    describe('right()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.right();
                expectRobotToBeInInitState(robot);
            });
        });

        const tests = [
            {
                args: [0, 0, 'NORTH'],
                expectedFacing: new Direction('EAST')
            },
            {
                args: [0, 0, 'EAST'],
                expectedFacing: new Direction('SOUTH')
            },
            {
                args: [0, 0, 'SOUTH'],
                expectedFacing: new Direction('WEST')
            },
            {
                args: [0, 0, 'WEST'],
                expectedFacing: new Direction('NORTH')
            }
        ];

        tests.forEach(({ args, expectedFacing }) => {
            describe('When robot is placed', () => {
                beforeEach(() => {
                    // @ts-ignore
                    robot.place(...args);
                });

                it(`Should rotate from ${args[2]} to ${expectedFacing}`, () => {
                    robot.right();
                    expect(robot.getCurrentDirection()).toEqual(expectedFacing);
                });

                it('Should not change robot position', () => {
                    expect(robot.getCurrentX()).toEqual(args[0]);
                    expect(robot.getCurrentY()).toEqual(args[1]);
                });
            });
        });
    });

    describe('move()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.move();
                expectRobotToBeInInitState(robot);
            });
        });

        const tests = [
            {
                args: [2, 0, 'NORTH'],
                expectedPosition: [2, 1],
            },
            {
                args: [2, 4, 'NORTH'],
                expectedPosition: [2, 4],
            },
            {
                args: [4, 2, 'WEST'],
                expectedPosition: [3, 2],
            },
            {
                args: [0, 2, 'WEST'],
                expectedPosition: [0, 2],
            },
            {
                args: [0, 2, 'EAST'],
                expectedPosition: [1, 2],
            },
            {
                args: [4, 2, 'EAST'],
                expectedPosition: [4, 2],
            },
            {
                args: [2, 0, 'SOUTH'],
                expectedPosition: [2, 0],
            },
            {
                args: [2, 4, 'SOUTH'],
                expectedPosition: [2, 3],
            },

        ];

        tests.forEach(({ args, expectedPosition }) => {
            describe(`When robot is placed facing ${args[2]}`, () => {
                beforeEach(() => {
                    // @ts-ignore
                    robot.place(...args);
                });

                it(`Should move from position ${args[0]},${args[1]} to ${expectedPosition}`, () => {
                    robot.move();
                    expect(robot.getCurrentX()).toEqual(expectedPosition[0]);
                    expect(robot.getCurrentY()).toEqual(expectedPosition[1]);
                });

                it('Should not change robot facing', () => {
                    // @ts-ignore
                    expect(robot.getCurrentDirection()).toEqual(new Direction(args[2]));
                });

            });
        });

    });

    describe('report()', () => {
        describe('When robot is not placed', () => {
            it('Should ignore the command', () => {
                robot.report();
                expectRobotToBeInInitState(robot);
                expect(consoleLogSpy).not.toHaveBeenCalled();
            });
        });

        describe('When robot is placed', () => {
            it('Should console log current robot position and facing', () => {
                robot.place(0, 1, 'EAST');
                robot.report();
                expect(consoleLogSpy).toHaveBeenCalledWith(0, 1, 'EAST');
            });
        });
        
        describe('When place arguments are not valid', () => {
            const tests = [
                ['4', '5', 'EAST'],
                [null, 2, 'EAST'],
                [2, null, 'EAST'],
                [2, 2, 'INVALID'],
            ];

            tests.forEach(args => {
                it('Should not change the robot coordinates', () => {
                    // @ts-ignore
                    robot.place(...args)
                    expectRobotToBeInInitState(robot);
                });
            });
        });

    });
});