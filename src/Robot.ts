import Direction, { DirectionStringType } from './Direction';

class Robot {
    private tableSize: number;
    private currentX?: number | string;
    private currentY?: number;
    private currentDirection?: Direction;

    constructor(tableSize: number) {
        this.tableSize = tableSize;
        this.currentX = undefined;
        this.currentY = undefined;
        this.currentDirection = undefined;
    }

    getTableSize(): number {
        return this.tableSize;
    }

    getCurrentX(): number | undefined | string{
        return this.currentX;
    }

    getCurrentY(): number | undefined {
        return this.currentY;
    }

    getCurrentDirection(): Direction | undefined {
        return this.currentDirection;
    }

    private isPlaced(): boolean {
        return this.currentX !== undefined && this.currentY !== undefined && this.currentDirection !== undefined;
    }

    place(x: number | string, y: number, direction: DirectionStringType): void {
        if (x >= 0 && y >= 0 && x < this.tableSize && y <= this.tableSize) {
            this.currentX = x;
            this.currentY = y;
            this.currentDirection = new Direction(direction);
        }
    }

    move(): void {
        if (!this.isPlaced()) {
            return;
        }
        // Implementation for move() method
    }

    left(): void {
        if (!this.isPlaced()) {
            return;
        }
        this.currentDirection!.left();
    }

    right(): void {
        if (!this.isPlaced()) {
            return;
        }
        this.currentDirection!.right();
    }

    report(): void {
        if (!this.isPlaced()) {
            return;
        }
        console.log(this.currentX, this.currentY, `${this.currentDirection}`);
    }
}

export default Robot;
