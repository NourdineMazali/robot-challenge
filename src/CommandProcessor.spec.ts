import * as fs from 'fs';
import ToyRobot from './ToyRobot';
import CommandProcessor from './CommandProcessor';

jest.mock('./ToyRobot');
jest.mock('fs');
jest.mock('yargs', () => ({
    option: () => ({
        help: () => ({
            argv: {
                commandsPath: 'commandsPath'
            }
        })
    })
}));

const fsMock: any = fs;


describe('CommandProcessor', () => {
    let commandsParser: any;
    const readFileSyncMock = jest.fn();

    beforeAll(() => {
        fsMock.readFileSync.mockImplementation(readFileSyncMock);
    });

    describe('When commands are correct', () => {
        const tests = [
            {
                comamndsString: 'PLACE 1,2,NORTH',
                runExpectations: (robot: ToyRobot) => expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
            },
            {
                comamndsString: 'LEFT',
                runExpectations: (robot: ToyRobot) => expect(robot.left).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'LEFT   SOMETHING SOMETHING',
                runExpectations: (robot: ToyRobot) => expect(robot.left).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'RIGHT',
                runExpectations: (robot: ToyRobot) => expect(robot.right).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'RIGHT 2 5',
                runExpectations: (robot: ToyRobot) => expect(robot.right).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'REPORT',
                runExpectations: (robot: ToyRobot) => expect(robot.report).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'MOVE',
                runExpectations: (robot: ToyRobot) => expect(robot.move).toHaveBeenCalledTimes(1),
            },
            {
                comamndsString: 'PLACE 1,2,NORTH\nLEFT\nRIGHT\nREPORT\nMOVE',
                runExpectations: (robot: ToyRobot) => {
                    expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
                    expect(robot.left).toHaveBeenCalledTimes(1)
                    expect(robot.right).toHaveBeenCalledTimes(1)
                    expect(robot.report).toHaveBeenCalledTimes(1)
                    expect(robot.move).toHaveBeenCalledTimes(1)
                },
            },
            {
                comamndsString: 'PLACE 1,2,NORTH\nINVALID  \n NOT VALID \n @22y21321 \nLEFT\n LEFT',
                runExpectations: (robot: ToyRobot, commandsParser: any) => {
                    expect(robot.place).toHaveBeenCalledWith(1, 2, 'NORTH'),
                    expect(robot.left).toHaveBeenCalledTimes(1);
                    expect(commandsParser.commands).toHaveLength(2);
                },
            }
        ];

        tests.forEach(({ comamndsString, runExpectations }) => {
            it(`Should execute correct robot commands for:\n ${comamndsString}`, () => {
                readFileSyncMock.mockReturnValue(comamndsString);
                const robot = new ToyRobot(5);
                commandsParser = new CommandProcessor();
    
                commandsParser.execute(robot);
                runExpectations(robot, commandsParser);
            });
        });
    });
});
