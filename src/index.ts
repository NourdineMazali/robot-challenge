import ToyRobot from './ToyRobot';
import CommandProcessor from './CommandProcessor';

const WORLD_SIZE = 5;
const r = new ToyRobot(WORLD_SIZE);
const cp = new CommandProcessor();
cp.execute(r);
