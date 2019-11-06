class NonCollidingAgent {
    constructor(id, type, row, col, grid) {
        this.id = id;
        this.type = type;
        this.location = {
            "row": row,
            "col": col,
        }
        this.grid = grid;
        this.fillGrid();
    }

    fillGrid() {
        this.grid.fillLocation(this.location);
    }
    
    freeGrid() {
        this.grid.freeLocation(this.location);
	}
	
	move() {
		let weights = [1, 1, 1, 1, 2];

		let row = this.location.row;
		let col = this.location.col;
		let rowAbove = row - 1;
		let rowBelow = row + 1;
		let colLeft = col - 1;
		let colRight = col + 1;

        let upLoc = {"row": rowAbove, "col":col};
		let downLoc = {"row": rowBelow, "col":col};
		let leftLoc = {"row": row, "col":colLeft};
		let rightLoc = {"row": row, "col":colRight};
        // top border/ top full
        if (rowAbove == 0) {
            weights[0] = 0;
        } else if (this.grid.isFull(upLoc)) {
			weights[0] = 0;
		}
        if (rowBelow == this.grid.locations.length) {
            weights[1] = 0;
		} else if (this.grid.isFull(downLoc)) {
			weights[1] = 0;
		}
		// left border
        if (colLeft == 0) {
            weights[3] = 0;
        } else if (this.grid.isFull(leftLoc)) {
			weights[3] = 0;
		}
		
		if (this.grid.isFull(rightLoc)) {
			weights[4] = 0;
		}
        
        let direction = generateDirection(weights);
        switch (direction) {
            //up
            case 0:
                this.up();
                break;
            //down
            case 1:
                this.down();
                break;
            case 2:
                // stay
                break;
            //left
            case 3:
                this.left();
                break;
            //right
            case 4:
                this.right();
                break;
            default:
                break;
        }
	}

    generateDirection(weights) {
        let total = weights.reduce((x1, x2) => x1 + x2, 0); // i.e. [1, 4, 3, 2] => 10
        let normWeights  = weights.map(x => x / total); // i.e. [1, 4, 3, 2] => [0.1, 0.4, 0.3, 0.2]
        let cumulativeSum = [];
        for (let index in normWeights) {
            if (index == 0) {
                cumulativeSum[index] = normWeights[index];
            } else {
                cumulativeSum[index] = cumulativeSum[index - 1] + normWeights[index];
            }
        }
        let rng = Math.random();
        let direction = 0;
        while (rng > cumulativeSum[direction]) {
            direction += 1;
        }
        return direction;
    }

    up() {
        this.freeGrid();
        this.location.row -= 1;
        this.fillGrid();
    }

    down() {
        this.freeGrid();
        this.location.row += 1;
        this.fillGrid();
    }

    left() {
        this.freeGrid();
        this.location.col -= 1;
        this.fillGrid();
    }

    right() {
        this.freeGrid();
        this.location.col += 1
        this.fillGrid();
    }
}

class Customer extends NonCollidingAgent {
    constructor(id, type, row, col, Grid, state, timeInSystem=0) {
        super(id, type, row, col, Grid);
        this.state = state;
        this.timeInSystem = timeInSystem;
    }
}

class Server extends NonCollidingAgent {
    constructor(id, type, row, col, Grid) {
        super(id, type, row, col, Grid);
        this.idle = true;
    }

    isIdle() {
        return this.idle;
    }
}

class Area {
	constructor(label, startRow, numRows, startCol, numCols,
			    fillColor='white', outlineColor='black', outlineWidth=1) {

        this.label = label;
        this.startRow = startRow;
        this.numRows = numRows;
        this.startCol = startCol;
        this.numCols = numCols;
		this.fillColor = fillColor;
		this.outlineColor = outlineColor;
		this.outlineWidth = outlineWidth;
    }
}

class NonCollidingArea extends Area {
    constructor(label, startRow, numRows, startCol, numCols, grid,
                fillColor='white', outlineColor='black', outlineWidth=1) {

        super(label, startRow, numRows, startCol, numCols,
              fillColor, outlineColor, outlineWidth);
        
        this.grid = grid;
        this.fillGrid();
    }

    fillGrid() {
        for (let row = this.startRow; row < this.numRows; row++) {
            for (let col = this.startCol; col < this.numCols; col++) {
                let location = {"row": row, "col": col};
                this.grid.fillLocation(location);
            }
        }
    }
}


class Grid {
    constructor(numRows, numCols, isempty=true) {
        this.locations = this.make2dArray(numRows, numCols, isempty);
    }

    isEmpty(location) {
        let row = location.row - 1;
        let col = location.col - 1;
        return this.locations[row][col];
    }

    isFull(location) {
        return !this.isEmpty(location);
    }

    fillLocation(location) {
        let row = location.row - 1;
        let col = location.col - 1;
        this.locations[row][col] = false;
    }

    freeLocation(location) {
        let row = location.row - 1;
        let col = location.col - 1;
        this.locations[row][col] = true;
    }

    make2dArray(numRows, numCols, value) {
        let arr = new Array();
        for (let row = 0; row < numRows; row++) {
            arr[row] = new Array(numCols).fill(value);
        }
        return arr;
    }
}

// Based on weights, generate direction with uniform distribution
generateDirection = function(weights) {

    let total = weights.reduce((x1, x2) => x1 + x2, 0); // i.e. [1, 4, 3, 2] => 10
    let normWeights  = weights.map(x => x / total); // i.e. [1, 4, 3, 2] => [0.1, 0.4, 0.3, 0.2]
    let cumulativeSum = [];
    for (let index in normWeights) {
        if (index == 0) {
            cumulativeSum[index] = normWeights[index];
        } else {
            cumulativeSum[index] = cumulativeSum[index - 1] + normWeights[index];
        }
    }

    let rng = Math.random();
    let direction = 0;
    while (rng > cumulativeSum[direction]) {
        direction += 1;
    }

    // console.log(`random is ${rng}, weights are ${cumulativeSum}`)

    return direction;
}


