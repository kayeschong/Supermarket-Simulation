class Grid {
    constructor(numRows, numCols, isempty=true) {
		this.numRows = numRows;
		this.numCols = numCols;
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

	fillLocations(startRow, numRows, startCol, numCols) {
		for (let row = startRow; row < startRow + numRows; row++) {
            for (let col = startCol; col < startCol + numCols; col++) {
				let location = {"row": row, "col": col};
                this.fillLocation(location);
            }
        }
	}

    make2dArray(numRows, numCols, value) {
        let arr = new Array();
        for (let row = 0; row < numRows; row++) {
            arr[row] = new Array(numCols).fill(value);
        }
        return arr;
    }
}

function insertPosition(relativePosition,addRow,addCol,numRows=window.numRows){
  switch(relativePosition.label){
    case 1:
    console.log(relativePosition)
    position = {

      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col+addCol}

    break;

    case 2 :
    this.position = {
      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col+addCol}

    break;

    case 3 :
    this.position = {
      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col-addCol}

    break;

    case 4 :
    this.position = {
      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col+addCol}

    break;

    case 5 :
    this.position = {
      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col+addCol}

    break;

    case 6 :
    this.position = {
      'startRow' :  relativePosition.row+addRow,
      'startCol' : relativePosition.col-addCol}

    break;

    case 7 :
    this.position = {
      'startRow' :  relativePosition.row-addRow,
      'startCol' : relativePosition.col+addCol}

    break;

    case 8 :
    this.position = {
      'startRow' :  relativePosition.row-addRow,
      'startCol' : relativePosition.col+addCol}
    break;

    case 9 :
    this.position = {
      'startRow' :  ((relativePosition.row-addRow)),
      'startCol' : relativePosition.col-addCol}

    break;
  }
  return position
  }


class Area {
	constructor(label, startRow, numRows, startCol, numCols,url,
			    fillColor='white', outlineColor='black', outlineWidth=1) {
        this.label = label;
        this.startRow = startRow;
        this.numRows = numRows;
        this.startCol = startCol;
        this.numCols = numCols;
        this.url = url;
		this.fillColor = fillColor;
		this.outlineColor = outlineColor;
		this.outlineWidth = outlineWidth;
    }
}


class NonCollidingArea  {
    constructor(label,  numRows, numCols, grid, url,relativePosition,addRow,addCol,
                fillColor='white', outlineColor='black', outlineWidth=1) {

    //super(label,  numRows,  numCols);
    this.label = label
    this.numRows = numRows
    this.numCols = numCols

		this.grid = grid;
		this.url = url;

    this.relativePosition = relativePosition
    console.log(this.relativePosition.row)
    this.addRow = addRow
    this.addCol = addCol
    this.position = insertPosition(this.relativePosition,this.addRow,this.addCol);
    console.log(this.position.startRow)
    this.grid.fillLocations(this.position.startRow, this.numRows, this.position.startCol, this.numCols,window.numRows);

    }
  }



class NonCollidingAgent {
    constructor(id, type, row, col, grid, url, timeEntered) {
        this.id = id;
        this.type = type;
        this.location = {
            "row": row,
            "col": col,
        }
        this.grid = grid;
        this.url = url;
        this.timeEntered = timeEntered;
        this.fillGrid();
    }

    fillGrid() {
        this.grid.fillLocation(this.location);
    }

    freeGrid() {
        this.grid.freeLocation(this.location);
	}

	getWeights(row, col) {
		// simple zoning, divide into 4 quarters
		let nrows = this.grid.numRows;
		let ncols = this.grid.numCols;
    let zone;
    if (col <= right_cashier.position.startCol && col >= right_cashier.position.startCol - 10) {

      if (row == right_cashier.position.startRow - 6) {
        this.timeQueued = currentTime;
      }
      if (row == right_cashier.position.startRow) {
        this.timePaying = currentTime;
      }

      // queue zone
      if (row < right_cashier.position.startRow && row > right_cashier.position.startRow - 7) {
        console.log(row);
        console.log(right_cashier.position.startRow - 8, right_cashier.position.startRow);
        return [0, 5, 7, 1, 1]
      }

      // cashier zone
      if (row <= right_cashier.position.startRow + 2 && row >= right_cashier.position.startRow + 1) {
        console.log(row);
        console.log(right_cashier.position.startRow, right_cashier.position.startRow + 3);
        return [0, 1, cashierDelay, 0, 0]
      }
    }
		if (row < Math.floor(nrows/2)) {
			// Upper
			if (col <= Math.floor(ncols/2)) {
				// Left
				zone = 0;
			} else {
				zone = 1;
			}
		} else {
			if (col <= Math.floor(ncols/2)) {
				// Left
				zone = 2;
			} else {
				zone = 3;
			}
		}
		switch (zone) {
			case 0:
				// upper left, more right
				return [1, 1, 2, 1, 2];
			case 1:
				// upper right, more down
				return [1, 7, 2, 1, 9.5];
			case 2:
				// lower left, more up, right
				return [3, 1, 2, 1, 2];
			case 3:
				// lower right, no more up
				return [0, 2, 5, 0.2, 0.2];
		}

	}

	move() {
		let row = this.location.row;
		let col = this.location.col;

		let weights = this.getWeights(row, col);

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

		if (colRight == this.grid.numCols) {
      weights[4] == 0;
		} else if (this.grid.isFull(rightLoc)) {
			weights[4] = 0;
		}

        let direction = this.generateDirection(weights);
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

let WINDOWBORDERSIZE = 10;
let HUGE = 999999; //Sometimes useful when testing for big or small numbers
let animationDelay = 200; //controls simulation and transition speed
let isRunning = false; // used in simStep and toggleSimStep
let surface; // Set in the redrawWindow function. It is the D3 selection of the svg drawing surface
let simTimer; // Set in the initialization function

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

//The drawing surface will be divided into logical cells
let maxCols = 50;
let cellWidth; //cellWidth is calculated in the redrawWindow function
let cellHeight; //cellHeight is calculated in the redrawWindow function

//You are free to change images to suit your purpose. These images came from icons-land.com.
// The copyright rules for icons-land.com require a backlink on any page where they appear.
// See the credits element on the html page for an example of how to comply with this rule.
const urlCustomerA = "images/girl.png";
const urlCustomerB = "images/boy.png";
const urlCashier1 = "images/cashier.png";
const urlCashier2 = "images/cashier.png";
//const urlReceptionist ="images/receptionist-icon.png"


const EXITED = 0;

// customers is a dynamic list, initially empty
let customers = [];

let currentTime = 0;
let statistics = [
  {"name":"Average time (seconds) in Supermarket: ", "location":{"row":1,"col":1}, "cumulativeTime": 0, "count": 0},
  {"name":"Average time (seconds) in queue: ", "location":{"row":2,"col":1}, "cumulativeTime": 0, "count": 0}
]

let grid;
let areas;
let staticList;
let nextArrivalTime;
let rate=0.1;
let bottomRow;
let right_cashier;
let cashierDelay = 30;
let thinRate = 1;

// This next function is executed when the script is loaded. It contains the page initialization code.
(function() {
	// Your page initialization code goes here
	// All elements of the DOM will be available here
	window.addEventListener("resize", redrawWindow); //Redraw whenever the window is resized
	simTimer = window.setInterval(simStep, animationDelay); // call the function simStep every animationDelay milliseconds
	document.getElementById("title").textContent = "Supermarket"
	redrawWindow();

})();

// We need a function to start and pause the the simulation.
function toggleSimStep(){
	//this function is called by a click event on the html page.
	// Search BasicAgentModel.html to find where it is called.
	mySound = new sound("Music.mp3")
	isRunning = !isRunning;
	//if(isRunning == false){mySound.play()}else{mySound.stop()};
	console.log("isRunning: "+isRunning);
}

function redrawWindow(){

	isRunning = false; // used by simStep
	window.clearInterval(simTimer); // clear the Timer
	animationDelay = 250 - document.getElementById("slider1").value;
  simTimer = window.setInterval(simStep, animationDelay); // call the function simStep every animationDelay milliseconds

  rate = document.getElementById("slider2").value;

  nextArrivalTime = generateDiscreteExpTime(rate);
  statistics[0].cumulativeTime = 0;
  statistics[0].count = 0;
  statistics[1].cumulativeTime = 0;
  statistics[1].count = 0;

	//resize the drawing surface; remove all its contents;
	let drawsurface = document.getElementById("surface");
	let creditselement = document.getElementById("credits");
	let w = window.innerWidth;
	let h = window.innerHeight;
	let surfaceWidth =(w - 3*WINDOWBORDERSIZE);
	let surfaceHeight= (h-creditselement.offsetHeight - 3*WINDOWBORDERSIZE);

	drawsurface.style.width = surfaceWidth+"px";
	drawsurface.style.height = surfaceHeight+"px";
	drawsurface.style.left = WINDOWBORDERSIZE/2+'px';
	drawsurface.style.top = WINDOWBORDERSIZE/2+'px';
//	drawsurface.style.border = "thick solid #0000FF"; //The border is mainly for debugging; okay to remove it
	drawsurface.innerHTML = ''; //This empties the contents of the drawing surface, like jQuery erase().

	// Compute the cellWidth and cellHeight, given the size of the drawing surface
	numCols = maxCols;
	cellWidth = surfaceWidth/numCols;
	numRows = Math.ceil(surfaceHeight/cellWidth);
  window.numRows = numRows
  console.log(numRows)
	cellHeight = surfaceHeight/numRows;
  topRow = 1
  middleRow = numRows/2
  bottomRow = numRows

  leftCol = 1
  middleCol = maxCols/2
  rightCol = maxCols

  topLeft = {'label' : 1, 'row' : topRow,'col' :leftCol}
  topMiddle ={'label' : 2, 'row' : topRow,'col' : middleCol}
  topRight = {'label' : 3, 'row' : topRow,'col' :rightCol}
  middleLeft = {'label' : 4, 'row' :middleRow ,'col' : leftCol}
  center = {'label' : 5, 'row' : middleRow,'col' : middleCol}
  middleRight = {'label' : 6, 'row' : middleRow,'col' : rightCol}
  bottomLeft = {'label' : 7, 'row' : bottomRow,'col' : leftCol}
  bottomMiddle = {'label' : 8, 'row' : bottomRow,'col' :middleCol}
  bottomRight = {'label' : 9, 'row' : bottomRow,'col' : rightCol}
  console.log(topLeft.row)

  const firstBlockRow = 2
  const firstBlockCol = 6
  const lastBlockRow = firstBlockRow+14
  function scale(row,maxRows = window.numRows){
    scale2 = Math.ceil(row/23*maxRows)
    return(scale2)
  }

  // Need to specify the label,numrow,numco,grid,img,relativePosition,how far right or how far left from the relative position



	grid = new Grid(numRows, numCols);


  let walls = new NonCollidingArea('Walls',scale(3),maxCols ,grid,"images/shelves1.png",topLeft,scale(1),0);

  let rightPole = new NonCollidingArea('rightPole',Math.ceil((10/23)*numRows), 4, grid,"images/pole1.png",bottomRight,Math.ceil((14/23)*numRows),14);
  let leftPole = new NonCollidingArea('leftPole', Math.ceil((10/23)*numRows), 3, grid,"images/pole2.png",bottomMiddle,scale(14),0);


  let cashier1 = new NonCollidingArea('cashier1', Math.ceil((2/23)*numRows), 2, grid,"images/Cashier3.png",bottomMiddle,scale(8),1);
  let cashier2 = new NonCollidingArea('cashier2', scale(2), 2, grid,"images/Cashier3.png",bottomMiddle,scale(8),6);

  let midLaneBlocker = new NonCollidingArea('midLaneBlocker', Math.ceil((5/23)*numRows), 3, grid,"images/box2.png",bottomMiddle,scale(12),5);
  let leftLaneBlocker = new NonCollidingArea('leftLaneBlocker', Math.ceil((5/23)*numRows), 1, grid,"images/box2.png",bottomMiddle,scale(12),1);

  // Reference cashier
  right_cashier = new NonCollidingArea('right_cashier', scale(2), 2, grid,"images/cashierself.png",bottomMiddle,scale(8),11);



  let snowGlobe =  new NonCollidingArea('snowGlobe', scale(3), 3, grid,"images/snow-globe.png",bottomMiddle,scale(14),5);

  let snowman =  new NonCollidingArea('snowman', scale(2), 2, grid,"images/snowman.png",bottomMiddle,scale(13),7);
  let milks3 = new NonCollidingArea('milks3', Math.ceil((15/23)*numRows), 3, grid,"images/box2.png",bottomMiddle,scale(18),10);
  let bag1 = new NonCollidingArea('bag1', scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),0.3);
  let bag2 = new NonCollidingArea('bag2',  scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),5);
  let bag3 = new NonCollidingArea('bag3',  scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),10);

  let trolley1 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),0);
  let trolley2 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),1);
  let trolley3 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),2);


  //EntranceArea
  let open = new NonCollidingArea('open',  scale(3), 3, grid,"images/open.png",bottomLeft,scale(5),10);
  let trolley4 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),14);
  let trolley5 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),15);
  let trolley6 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),13);
  let trolley7 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),14);
  let trolley8 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),15);
  let trolley9 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),13);
  let trolley10 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),14);
  let trolley11 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),12);
  let trolley12 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),13);
  let iceCream = new NonCollidingArea('rightPole',  scale(3), 3, grid,"images/iceCream.png",bottomLeft,scale(5),16);
  let entrance1 = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/barrier.png",bottomLeft,scale(4),0);
  let entrance2= new NonCollidingArea('rightPole', scale(2), 2, grid,"images/barrier.png",bottomLeft,scale(4),8); //15
  let cottonCandy =  new NonCollidingArea('rightPole', scale(2), 1, grid,"images/cottoncandy.png",bottomLeft,scale(4),19);
  let popcorn=  new NonCollidingArea('rightPole', scale(2), 1, grid,"images/popcorn.png",bottomLeft,scale(4),20);
  let rotate=  new NonCollidingArea('rightPole', scale(2), 1, grid,"images/rotate.png",bottomLeft,scale(4),21);
  //let cottonCandy =  new NonCollidingArea('rightPole', scale(3), 3, grid,"images/christmas-tree.png",bottomMiddle,scale(11),6);
  //let popcorn = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/snowman.png",bottomMiddle,scale(10),4);
  let tree =  new NonCollidingArea('rightPole', scale(3), 2, grid,"images/christmas-tree.png",bottomLeft,scale(5),22);
  let entranceBlocker = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/box2.png",bottomLeft,scale(2),8);



  //shelvesArea

  let oats = new NonCollidingArea('open', scale(2), 4, grid,"images/oatshalf1.png",topLeft,scale(6),6);
  let detergent1 = new NonCollidingArea('open',scale(2), 4, grid,"images/detergenthalf1.png",topLeft,scale(12),6);
  let bread = new NonCollidingArea('open', scale(2), 4, grid,"images/breadhalf1.png",topLeft,scale(6),16);
  let detergent2 = new NonCollidingArea('open', scale(2), 4, grid,"images/detergenthalf2.png",topLeft,scale(12),16);
  let roundSauces = new NonCollidingArea('open',scale(3), 2, grid,"images/sauces3.png",topLeft,scale(8),12);

  //clothesArea
  let direction = new NonCollidingArea('open', scale(3), 2, grid,"images/directions.png",topLeft,scale(7),1);

  let clothes1 = new NonCollidingArea('open', scale(4), 5, grid,"images/Clothes1.png",topMiddle,scale(5),16);
  let ginger= new NonCollidingArea('open', scale(3), 2, grid,"images/box2.png",topMiddle,scale(4),11);
  let clothes2 = new NonCollidingArea('open',scale(2), 4, grid,"images/Clothes2.png",topMiddle,scale(7),21);

  //Walls
  let vegeMachine = new NonCollidingArea('open', scale(2), 2, grid,"images/vegemachine.png",topLeft,scale(2),1);
  let fruit1 = new NonCollidingArea('open', scale(2), 3, grid,"images/fruits3.png",topLeft,scale(2),3);
  let fruit2 = new NonCollidingArea('open', scale(2), 3, grid,"images/Fruit.png",topLeft,scale(2),8);
  //let weight = new NonCollidingArea('open', 2, 3, grid,"images/weight.png",topLeft,2,9);
  let vegetable1 = new NonCollidingArea('open', scale(2), 3, grid,"images/Vegetables.png",topLeft,scale(2),13);
  let meat = new NonCollidingArea('open', scale(3), 5, grid,"images/meat.png",topLeft,scale(1),19);
  let seafood = new NonCollidingArea('open', scale(3), 5, grid,"images/seafood.png",topLeft,scale(1),24);
  let fridge1 = new NonCollidingArea('open', scale(3), 2, grid,"images/cheese2.png",topRight,scale(1),12);
  let fridge2 = new NonCollidingArea('open', scale(3), 2, grid,"images/drinks2.png",topRight,scale(1),10);
  let fridge3 = new NonCollidingArea('open', scale(3), 2, grid,"images/drinks3.png",topRight,scale(1),8);
  let bread2 = new NonCollidingArea('open', scale(3), 2, grid,"images/bread2.png",topRight,scale(1),14);
  let toysMachine = new NonCollidingArea('open', scale(3), 2, grid,"images/toysmachine.png",topRight,scale(1),5);
  let shelvesitems1 = new NonCollidingArea('open',scale(0.6), 2, grid,"images/shelvesItems2.png",topRight,scale(2),17);
  let shelvesitems2 = new NonCollidingArea('open', scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(2),19);
  let shelvesitems3 = new NonCollidingArea('open', scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(3),17);
  let shelvesitems4 = new NonCollidingArea('open',scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(3),19);


  areas = [walls,iceCream, rightPole, leftPole,leftLaneBlocker,midLaneBlocker, milks3, cashier1,cashier2,right_cashier,bag1,bag2,bag3,trolley1,trolley2,trolley3,trolley4,trolley5,trolley6,trolley7,trolley8,trolley9,open,
  snowGlobe,tree,snowman,entrance1,entrance2,oats,detergent1,detergent2,roundSauces,bread,direction, clothes1,clothes2,fruit1,fruit2,vegetable1,vegeMachine,seafood,meat,cottonCandy,popcorn,rotate,//,water,popcorn,
  bread2,fridge1,fridge2,fridge3,shelvesitems1,shelvesitems2,shelvesitems3,shelvesitems4,toysMachine,ginger, entranceBlocker];


  currentTime = 0;
  staticList = [];
  customers = [];



	// In other functions we will access the drawing surface using the d3 library.
	//Here we set the global letiable, surface, equal to the d3 selection of the drawing surface
	surface = d3.select('#surface');
	surface.selectAll('*').remove(); // we added this because setting the inner html to blank may not remove all svg elements
	surface.style("font-size","100%");
	// rebuild contents of the drawing surface
	updateSurface();
};

// The window is resizable, so we need to translate row and column coordinates into screen coordinates x and y
function getLocationCell(location){
	let row = location.row;
	let col = location.col;
	let x = (col-1)*cellWidth; //cellWidth is set in the redrawWindow function
	let y = (row-1)*cellHeight; //cellHeight is set in the redrawWindow function
	return {"x":x,"y":y};
}


function updateSurface(){
	// Finally, we would like to draw boxes around the different areas of our system. We can use d3 to do that too.
	let allareas = surface.selectAll(".areas").data(areas);
	let newareas = allareas.enter().append("g").attr("class","areas");
	// For each new area, append a rectangle to the group
	newareas.append("svg:image")
	.attr("x", function(d) {return (d.position.startCol-1)*cellWidth;})
	.attr("y",  function(d) {return (d.position.startRow-1)*cellHeight;})
	.attr("width",  function(d) {return d.numCols*cellWidth+'px';})
	.attr("height",  function(d) {return d.numRows*cellHeight+'px';})
	.attr("preserveAspectRatio", "none")
  .attr("xlink:href",function(d){return d.url;})

	let allcustomers = surface.selectAll(".customer").data(customers);


  allcustomers.exit().remove();


  let newcustomers = allcustomers.enter().append("g").attr("class","customer");

	newcustomers.append("svg:image")
	 .attr("x",function(d){let cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){let cell= getLocationCell(d.location); return cell.y+"px";})
	 .attr("width", Math.min(cellWidth,cellHeight)+"px")
	 .attr("height", Math.min(cellWidth,cellHeight)+"px")
	 .attr("xlink:href",function(d){return d.url});// Possible to change this to include two images

	// For the existing customers, we want to update their location on the screen
	// but we would like to do it with a smooth transition from their previous position.
	// D3 provides a very nice transition function allowing us to animate transformations of our svg elements.

	//First, we select the image elements in the allcustomers list
	let images = allcustomers.selectAll("image");
	// Next we define a transition for each of these image elements.
	// Note that we only need to update the attributes of the image element which change
	images.transition()
	 .attr("x",function(d){let cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){let cell= getLocationCell(d.location); return cell.y+"px";})
	 .duration(animationDelay).ease('sine'); // This specifies the speed and type of transition we want. //

	// Patients will leave the clinic when they have been discharged.
	// That will be handled by a different function: removeDynamicAgents

	//Select all svg elements of class "caregiver" and map it to the data list called caregivers
	let allcaregivers = surface.selectAll(".caregiver").data(staticList);
	//This is not a dynamic class of agents so we only need to set the svg elements for the entering data elements.
	// We don't need to worry about updating these agents or removing them
	// Create an svg group ("g") for each new entry in the data list; give it class "caregiver"
	let newcaregivers = allcaregivers.enter().append("g").attr("class","caregiver");
	newcaregivers.append("svg:image")
	 .attr("x",function(d){let cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){let cell= getLocationCell(d.location); return cell.y+"px";})
	 .attr("width", Math.min(cellWidth,cellHeight)+"px")//2*cellWidth  to make image bigger
	 .attr("height", Math.min(cellWidth,cellHeight)+"px")
	 .attr("xlink:href",function(d){return d.url;})
  // .attr("position",absolute)


	let allstatistics = surface.selectAll(".statistics").data(statistics);
	let newstatistics = allstatistics.enter().append("g").attr("class","statistics");
	// For each new statistic group created we append a text label

	newstatistics.append("text")
	.attr("x", function(d) { let cell= getLocationCell(d.location); return (cell.x+cellWidth)+"px"; })
	.attr("y", function(d) { let cell= getLocationCell(d.location); return (cell.y+cellHeight/2)+"px"; })
  .attr("dy", ".35em")
  .text("");

	// The data in the statistics array are always being updated.
	// So, here we update the text in the labels with the updated information.
	allstatistics.selectAll("text").text(function(d) {
		let avgLengthOfStay = d.cumulativeTime/(Math.max(1,d.count)); // cumulativeValue and count for each statistic are always changing
		return d.name+avgLengthOfStay.toFixed(1); }); //The toFixed() function sets the number of decimal places to display
	// allstatistics.selectAll("text").text( d => d.rejected);

  thinRate = document.getElementById('slider4').value;
  cashierDelay = 30 - document.getElementById("slider3").value;

}

function generateDiscreteExpTime(rate) {
  let U = Math.random();
  let time_delta = (-Math.log(1 - U)) / rate;
  let next_time = Math.max(1, Math.round(time_delta)) // ensure discrete time
  return next_time;
}

function thinPoisson(probAccept) {
  let U = Math.random();
  return probAccept > U;
}

function addDynamicAgents() {

  //
  let arrivalApproved = false;

	if (nextArrivalTime == currentTime) {
    arrivalApproved = thinPoisson(thinRate);
    nextArrivalTime += generateDiscreteExpTime(rate);
  }

  if (arrivalApproved) {
    let initialRow = bottomRow - 1;
    let doorStartCol = 0;
    let doorLength = 3;
    let initialCol = Math.floor(Math.random() * doorLength + doorStartCol);

		let newcustomer = new NonCollidingAgent(1, "A", initialRow, initialCol, grid,"images/girl.png", currentTime);


		let customerType = Math.floor(Math.random()*5);
		switch (customerType) {
				case 0:
				    newcustomer.type = "A";
						newcustomer.url = "images/girl.png" ;
				break;

				case 1 :
				     newcustomer.type = "B";
				     newcustomer.url = "images/boy.png" ;
				break;

				case 2:
						newcustomer.type = "C";
						newcustomer.url = "images/old-woman.png" ;
				break;

				case 3 :
						 newcustomer.type = "D";
						 newcustomer.url = "images/minion.png" ;
				break;
				case 4 :
						 newcustomer.type = "E";
						 newcustomer.url = "images/family.png" ;

	}
	customers.push(newcustomer);

}}

function updatePatient(customerIndex){

  customerIndex = Number(customerIndex);

	let customer = customers[customerIndex];
  customer.move();

  //Exit Condition
  let cashier_row = right_cashier.position.startRow + right_cashier.numRows;
  let cashier_col = right_cashier.position.startCol + right_cashier.numCols;
	if (customer.location.col >= cashier_col - 10 && customer.location.row >= cashier_row + 3) {
    customer.state = EXITED;
    // free up customer's location
    grid.freeLocation(customer.location)
    // update stats
    let timeInSystem = currentTime - customer.timeEntered;
    let timeInQueue = customer.timePaying - customer.timeQueued - 10;
    statistics[0].cumulativeTime += timeInSystem;
    statistics[0].count += 1;
    statistics[1].cumulativeTime += timeInQueue;
    statistics[1].count += 1;
	}
}

function removeDynamicAgents(){
	// We need to remove customers who have been discharged.
	//Select all svg elements of class "customer" and map it to the data list called customers
	let allCustomers = surface.selectAll(".customer").data(customers);
	//Select all the svg groups of class "customer" whose state is EXITED
	let exitingCustomers = allCustomers.filter(function(d,i){return d.state==EXITED;});
	// Remove the svg groups of EXITED customers: they will disappear from the screen at this point
	exitingCustomers.remove();

	// Remove the EXITED customers from the customers list using a filter command
	customers = customers.filter(function(d){return d.state!=EXITED;});
	// At this point the customers list should match the images on the screen one for one
	// and no customers should have state EXITED
}


function updateDynamicAgents(){
	// loop over all the agents and update their states
	for (let customerIndex in customers){
		updatePatient(customerIndex);
	}
	updateSurface();
}

function simStep(){
	//This function is called by a timer; if running, it executes one simulation step
	//The timing interval is set in the page initialization function near the top of this file
	if (isRunning){ //the isRunning letiable is toggled by toggleSimStep
		// Increment current time (for computing statistics)
		currentTime++;
		// Sometimes new agents will be created in the following function

		addDynamicAgents();
		// In the next function we update each agent
		updateDynamicAgents();
		// Sometimes agents will be removed in the following function
		removeDynamicAgents();
	}
}
