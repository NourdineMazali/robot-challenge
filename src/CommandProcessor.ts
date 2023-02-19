import * as yargs from 'yargs';
import * as fs from 'fs';
import ToyRobot, { DirectionStringType } from './ToyRobot';

const COMMANDS_MAP: { [key: string]: any } = {
    'PLACE': (commandLine: string) => {
        const splitted = commandLine.split(' ');
        const args: string[] = splitted[1].split(',');
        const x: number = Number(args[0]);
        const y: number = Number(args[1]);
        const facing: DirectionStringType = args[2] as DirectionStringType;

        return (r: ToyRobot) => r.place(x, y, facing);
    },
    'LEFT': (commandLine: string) => (r: ToyRobot) => r.left(),
    'RIGHT': (commandLine: string) => (r: ToyRobot) => r.right(),
    'MOVE': (commandLine: string) => (r: ToyRobot) => r.move(),
    'REPORT': (commandLine: string) => (r: ToyRobot) => r.report(),
};

class CommandProcessor {
    commands: ((r: ToyRobot) => void)[];

    constructor() {
        const argv = (yargs as any)
            .option('commandsPath', {
                type: 'path',
                alias: 'c',
                describe: 'path to commands file'
            })
            .help()
            .argv
        const commandsString = fs.readFileSync(argv.commandsPath, 'utf-8');
        
        this.commands = commandsString.split('\n').map(line => {
            const splitted = line.split(' ');
            const command = splitted[0];

            const commandCreator = COMMANDS_MAP[command];
            return commandCreator && commandCreator(line);
        }).filter(Boolean);
    }

    execute(r: ToyRobot) {
        this.commands.forEach(c => {
            c(r)
        });
    }
}

export default CommandProcessor;
