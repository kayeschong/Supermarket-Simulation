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


class Static {
	constructor(type, label, row, col, url, grid, state = IDLE) {
        this.type = type
        this.label = label;
        this.location = {
            "row": row,
            "col": col,
        };
        this.state = state;
        this.url = url;
		this.grid = grid;
		this.grid.fillLocation(this.location);
    }
}
// static list, populated with the cashier, receptionist, will be adding those static items such as the shelves object

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
    constructor(id, type, row, col, grid, url) {
        this.id = id;
        this.type = type;
        this.location = {
            "row": row,
            "col": col,
        }
        this.grid = grid;
		    this.url = url;
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
				return [1, 1, 1, 1, 5];
			case 1:
				// upper right, more down
				return [1, 5, 1, 1, 5];
			case 2:
				// lower left, more up, right
				return [5, 1, 1, 1, 5];
			case 3:
				// lower right, no more up
				return [0, 1, 1, 1, 5];
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

// Locations
let doctorLocation = {"row": 10, "col": 20};
let receptionistLocation = {"row": 1, "col": 20};
let doctorRow = 10;
let doctorCol = 20;
let receptionistRow = 1;
let receptionistCol = 20;

//a patient enters the hospital UNTREATED; he or she then is QUEUEING to be treated by a doctor;
// then INTREATMENT with the doctor; then TREATED;
// When the patient is DISCHARGED he or she leaves the clinic immediately at that point.
const UNTREATED=0;
const WAITING=1;
const STAGING=2;
const INTREATMENT =3;
const TREATED=4;
const DISCHARGED=5;
const EXITED = 6;

// The doctor can be either BUSY treating a patient, or IDLE, waiting for a patient
const IDLE = 0;
const BUSY = 1;

// There are two types of caregivers in our system: doctors and receptionists
const DOCTOR = 0;
const RECEPTIONIST = 1;

//
const EMPTY = 0;
const OCCUPIED = 1;

// patients is a dynamic list, initially empty
let patients = [];

let currentTime = 0;
/*let statistics = [
{"name":"Average time in clinic, Type A: ","location":{"row":doctorRow+3,"col":doctorCol-4},"cumulativeValue":0,"count":0, "rejected":0},
{"name":"Average time in clinic, Type B: ","location":{"row":doctorRow+4,"col":doctorCol-4},"cumulativeValue":0,"count":0, "rejected":0},
{"name":"Average percentage of patients rejected: ", "location":{"row":doctorRow+5,"col":doctorCol-4},"cumulativeValue":0, "count":0}
];*/

// We can have different types of patients (A and B) according to a probability, probTypeA.
// This version of the simulation makes no difference between A and B patients except for the display image
// Later assignments can build on this basic structure.

let grid;
let areas;
let staticList;
let nextArrivalTime;
let rate=0.5;
let bottomRow;

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
	animationDelay = 550 - document.getElementById("slider1").value;
  simTimer = window.setInterval(simStep, animationDelay); // call the function simStep every animationDelay milliseconds
  
  
  rate = document.getElementById("slider2").value;
  nextArrivalTime = generateDiscreteExpTime(rate);


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



	grid = new Grid(numRows, numCols);
  const firstBlockRow = 2
  const firstBlockCol = 6
  const lastBlockRow = firstBlockRow+14

  // Need to specify the label,numrow,numco,grid,img,relativePosition,how far right or how far left from the relative position

  // Need to specify the label,numrow,numco,grid,img,relativePosition,how far right or how far left from the relative position
  function scale(row,maxRows = window.numRows){
    scale2 = Math.floor(row/21*maxRows)
    return(scale2)

  }

  let walls = new NonCollidingArea('Walls',scale(3),maxCols ,grid,"images/shelves1.png",topLeft,scale(1),0);

  let rightPole = new NonCollidingArea('rightPole',Math.floor((7/21)*numRows), 4, grid,"images/pole1.png",bottomRight,Math.floor((10/21)*numRows),14);
  let leftPole = new NonCollidingArea('rightPole', Math.floor((7/21)*numRows), 4, grid,"images/pole2.png",bottomMiddle,scale(10),0);
  let cashier1 = new NonCollidingArea('rightPole', Math.floor((2/21)*numRows), 2, grid,"images/Cashier3.png",bottomMiddle,scale(8),2);
  let cashier2 = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/Cashier3.png",bottomMiddle,scale(8),6);
  let cashier3 = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/cashierself.png",bottomMiddle,scale(8),11);
  let bag1 = new NonCollidingArea('rightPole', scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),1);
  let bag2 = new NonCollidingArea('rightPole',  scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),5);
  let bag3 = new NonCollidingArea('rightPole',  scale(1), 0.8, grid,"images/bags.png",bottomMiddle,scale(7),10);

  let trolley1 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),0);
  let trolley2 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),1);
  let trolley3 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomMiddle,scale(3),2);


  //CashierArea
 ;


  //console.log(test)
  //console.log(test.position.startCol)
  //EntranceArea
  let open = new NonCollidingArea('open',  scale(3), 3, grid,"images/open.png",bottomLeft,scale(5),3);
  let trolley4 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),9);
  let trolley5 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),9);
  let trolley6 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),7);
  let trolley7 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),7);
  let trolley8 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(4),8);
  let trolley9 = new NonCollidingArea('rightPole',  scale(1), 1, grid,"images/trolley2.png",bottomLeft,scale(3),8);
  let iceCream = new NonCollidingArea('rightPole',  scale(2), 2, grid,"images/iceCream.png",bottomLeft,scale(4),17);
  let entrance1 = new NonCollidingArea('rightPole', scale(2), 2, grid,"images/barrier.png",bottomLeft,scale(4),10);
  let entrance2= new NonCollidingArea('rightPole', scale(2), 2, grid,"images/barrier.png",bottomLeft,scale(4),15);
  let snowGlobe =  new NonCollidingArea('rightPole', scale(3), 3, grid,"images/snow-globe.png",bottomLeft,scale(5),19);
  let snowman=  new NonCollidingArea('rightPole', scale(2), 2, grid,"images/snowman.png",bottomLeft,scale(4),21);
  let tree =  new NonCollidingArea('rightPole', scale(3), 2, grid,"images/christmas-tree.png",bottomLeft,scale(5),22);



  //shelvesArea

  let oats = new NonCollidingArea('open', scale(2), 4, grid,"images/oatshalf1.png",topLeft,scale(6),6);
  let detergent1 = new NonCollidingArea('open',scale(2), 4, grid,"images/detergenthalf1.png",topLeft,scale(12),6);
  let bread = new NonCollidingArea('open', scale(2), 4, grid,"images/breadhalf1.png",topLeft,scale(6),16);
  let detergent2 = new NonCollidingArea('open', scale(2), 4, grid,"images/detergenthalf2.png",topLeft,scale(12),16);
  let roundSauces = new NonCollidingArea('open',scale(3), 2, grid,"images/sauces3.png",topLeft,scale(8),12);

  //clothesArea
  let direction = new NonCollidingArea('open', scale(3), 2, grid,"images/directions.png",topMiddle,scale(7),0);
  let clothes1 = new NonCollidingArea('open', scale(4), 5, grid,"images/Clothes1.png",topMiddle,scale(5),9);
  let clothes2 = new NonCollidingArea('open',scale(2), 4, grid,"images/Clothes2.png",topMiddle,scale(7),14);

  //Walls
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
  let shelvesitems1 = new NonCollidingArea('open',scale(0.6), 2, grid,"images/shelvesItems2.png",topRight,scale(2),17);
  let shelvesitems2 = new NonCollidingArea('open', scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(2),19);
  let shelvesitems3 = new NonCollidingArea('open', scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(3),17);
  let shelvesitems4 = new NonCollidingArea('open',scale(0.7), 2, grid,"images/shelvesItems2.png",topRight,scale(3),19);

  //CashierArea
  /*let rightPole = new NonCollidingArea('rightPole', 7, 4, grid,"images/pole1.png",bottomRight,11,0);
  let leftPole = new NonCollidingArea('rightPole', 7, 4, grid,"images/pole2.png",bottomMiddle,11,7);
  let cashier1 = new NonCollidingArea('rightPole', 2, 2, grid,"images/cashier3.png",center,3,9);
  let cashier2 = new NonCollidingArea('rightPole', 2, 2, grid,"images/cashier3.png",center,3,14);
  let cashier3 = new NonCollidingArea('rightPole', 2, 2, grid,"images/cashierself.png",center,3,18);
  let iceCream = new NonCollidingArea('rightPole', 2, 2, grid,"images/iceCream.png",bottomRight,5,5);//4 to 6
  let trolley1 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomRight,4,8);
  let trolley2 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomRight,4,9);
  let trolley3 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomRight,4,10);
  //console.log(test)
  //console.log(test.position.startCol)
  //EntranceArea
  let open = new NonCollidingArea('open', 3, 3, grid,"images/open.png",bottomLeft,6,1);
  let trolley4 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,5,6);
  let trolley5 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,5,7);
  let trolley6 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,5,8);
  let trolley7 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,4,6);
  let trolley8 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,4,7);
  let trolley9 = new NonCollidingArea('rightPole', 1, 1, grid,"images/trolley2.png",bottomLeft,4,8);
  let entrance1 = new NonCollidingArea('rightPole', 2, 2, grid,"images/barrier.png",bottomLeft,5,10);
  let entrance2= new NonCollidingArea('rightPole', 2, 2, grid,"images/barrier.png",bottomLeft,5,15);
  let snowGlobe =  new NonCollidingArea('rightPole', 3, 3, grid,"images/snow-globe.png",bottomLeft,6,18);
  let snowman=  new NonCollidingArea('rightPole', 2, 2, grid,"images/snowman.png",bottomLeft,5,20);
  let tree =  new NonCollidingArea('rightPole', 3, 2, grid,"images/christmas-tree.png",bottomLeft,6,21);

  //shelvesArea

  let oats = new NonCollidingArea('open', 2, 4, grid,"images/oatshalf1.png",topLeft,6,6);
  let detergent1 = new NonCollidingArea('open', 2, 4, grid,"images/detergenthalf1.png",topLeft,12,6);
  let bread = new NonCollidingArea('open', 2, 4, grid,"images/breadhalf1.png",topLeft,6,16);
  let detergent2 = new NonCollidingArea('open', 2, 4, grid,"images/detergenthalf2.png",topLeft,12,16);
  let roundSauces = new NonCollidingArea('open', 3, 2, grid,"images/sauces3.png",topLeft,8,12);

  //clothesArea
  let direction = new NonCollidingArea('open', 3, 2, grid,"images/directions.png",topMiddle,9,5);
  let clothes1 = new NonCollidingArea('open', 4, 5, grid,"images/clothes1.png",topMiddle,5,15);
  let clothes2 = new NonCollidingArea('open', 2, 4, grid,"images/clothes2.png",topMiddle,7,20);

  //Walls
  let fruit1 = new NonCollidingArea('open', 2, 3, grid,"images/fruits3.png",topLeft,2,2);
  let fruit2 = new NonCollidingArea('open', 2, 3, grid,"images/Fruit.png",topLeft,2,5);
  //let weight = new NonCollidingArea('open', 2, 3, grid,"images/weight.png",topLeft,2,9);
  let vegetable1 = new NonCollidingArea('open', 2, 3, grid,"images/vegetables.png",topLeft,2,13);
  let meat = new NonCollidingArea('open', 3, 5, grid,"images/meat.png",topLeft,1,19);
  let seafood = new NonCollidingArea('open', 3, 5, grid,"images/seafood.png",topLeft,1,24);
  let fridge1 = new NonCollidingArea('open', 3, 2, grid,"images/cheese2.png",topRight,1,5);
  let fridge2 = new NonCollidingArea('open', 3, 2, grid,"images/drinks2.png",topRight,1,3);
  let fridge3 = new NonCollidingArea('open', 3, 2, grid,"images/drinks3.png",topRight,1,1);
  let bread2 = new NonCollidingArea('open', 3, 2, grid,"images/bread2.png",topRight,1,-1);
  //let drinks1 = new NonCollidingArea('open', 3, 2, grid,"images/drinks4.png",topRight,1,-5);*/





	// console.log(grid.locations);
	/*let waitingRoom = new Area('Waiting Area', 4, 3, 19, 3,"images/divide.png")
	let stagingRoom = new Area('Staging Area', doctorRow - 1, 1, doctorCol - 2, 5, "images/divide.png");
	console.log(grid.locations);
  let walls = new NonCollidingArea('Walls', 1, 4, 1,maxCols-1, grid,"images/shelves1.png");
  let light1 = new NonCollidingArea('Walls', 1, 1, 3,1, grid,"images/lights.png");
	let block1 = new NonCollidingArea('Block 1', firstBlockRow+5, 6, firstBlockCol, 2, grid,"images/shelves1.png");
	let block2 = new NonCollidingArea('Block 1', firstBlockRow+14, 6, firstBlockCol, 2, grid,"images/shelves1.png");
  let block3 = new NonCollidingArea('Block 1', firstBlockRow+5, 6, firstBlockCol+7, 2, grid,"images/shelves1.png");
	let block4 = new NonCollidingArea('Block 1', lastBlockRow, 6, firstBlockCol+7, 2, grid,"images/shelves1.png");
  let directions = new NonCollidingArea('Block 1', lastBlockRow-6, 3, firstBlockCol+11, 2, grid,"images/directions.png");
	let meat = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+12, 5, grid,"images/meat.png");
  let seafood = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+17, 5, grid,"images/seafood.png");
  let cheese2 = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+24, 2, grid,"images/cheese2.png");
  let drinks2 = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+26, 2, grid,"images/drinks2.png");
  let drinks3 = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+28, 2, grid,"images/drinks3.png");
  let bread2 = new NonCollidingArea('Block 1', firstBlockRow, 3,firstBlockCol+30, 2, grid,"images/bread2.png");
  let sauces3 = new NonCollidingArea('Block 1', firstBlockRow+8, 3,firstBlockCol+4, 2, grid,"images/sauces3.png");
  let clothes1 = new NonCollidingArea('Block 1', firstBlockRow+5, 4,firstBlockCol+18, 5, grid,"images/clothes1.png");
  let clothes2 = new NonCollidingArea('Block 1', firstBlockRow+7, 2,firstBlockCol+23, 4, grid,"images/clothes2.png");
  let toys1 = new NonCollidingArea('Block 1', firstBlockRow+12, 2,firstBlockCol+18, 4, grid,"images/toys3.png");
  let tree = new NonCollidingArea('Block 1', firstBlockRow+11, 3,firstBlockCol+23, 3, grid,"images/christmas-tree.png");
  let snowman  =  new NonCollidingArea('Block 1', firstBlockRow+12, 2,firstBlockCol+25, 2, grid,"images/snowman.png");
  let snowGlobe = new NonCollidingArea('Block 1', firstBlockRow+11, 3,firstBlockCol+20, 3, grid,"images/snow-globe.png");


  let fruits = new NonCollidingArea('Block 1', firstBlockRow+1, 2,firstBlockCol, 3, grid,"images/Fruit.png");
  let fruits2 = new NonCollidingArea('Block 1', firstBlockRow+1, 2,firstBlockCol-3, 3, grid,"images/fruits3.png");
  let vegetables = new NonCollidingArea('Block 1', firstBlockRow+1, 2,firstBlockCol+7, 3, grid,"images/vegetables.png");
  let oats = new NonCollidingArea('Block 1', firstBlockRow+5, 2,firstBlockCol, 4, grid,"images/oatshalf1.png");
  let iceCream = new NonCollidingArea('Block 1', firstBlockRow+18, 3,firstBlockCol, 3, grid,"images/iceCream.png");
  let middleCold = new NonCollidingArea('Block 1', firstBlockRow+19, 2,firstBlockCol+3, 4, grid,"images/middle_cold_storage.png");
  let iceCreamLogo = new NonCollidingArea('Block 1', firstBlockRow+16, 1.5,firstBlockCol-2, 2, grid,"images/iceCreamLogo.png");


  let bread = new NonCollidingArea('Block 1', firstBlockRow+5, 2,firstBlockCol+6, 4, grid,"images/breadhalf1.png");
  let detergent1 = new NonCollidingArea('Block 1', firstBlockRow+12, 2,firstBlockCol, 4, grid,"images/detergenthalf1.png");
  let detergent2 = new NonCollidingArea('Block 1', firstBlockRow+12, 2,firstBlockCol+6, 4, grid,"images/detergenthalf2.png");
	let block5 = new NonCollidingArea("Block 4", firstBlockRow+1, 2,firstBlockCol+14, 8, grid,"images/archive.png");
  let block6 = new NonCollidingArea("Block 4", firstBlockRow+1, 2,firstBlockCol+14, 8, grid,"images/archive.png");
  let cashier1 = new NonCollidingArea("Cashier", lastBlockRow+5, 2, firstBlockCol+14, 2, grid,"images/cashier3.png");
  let cashier2 = new NonCollidingArea("Cashier", lastBlockRow+5, 2, firstBlockCol+18, 2, grid,"images/cashier3.png");
  let cashier3 = new NonCollidingArea("Cashier", lastBlockRow+3, 1.5, firstBlockCol+22, 1.5, grid,"images/cashierself.png");
  let cashier4 = new NonCollidingArea("Cashier", lastBlockRow+3, 1.5, firstBlockCol+26, 1.5, grid,"images/cashierself.png");
  let cashier5 = new NonCollidingArea("Cashier", lastBlockRow+7, 1.5, firstBlockCol+22, 1.5, grid,"images/cashierself.png");
  let cashier6 = new NonCollidingArea("Cashier", lastBlockRow+7, 1.5, firstBlockCol+26, 1.5, grid,"images/cashierself.png");
  let open = new NonCollidingArea("open", firstBlockRow+25, 3, firstBlockCol, 3, grid,"images/open.png");
  let entrance1 = new Area ('entrance1',firstBlockRow+23,2,firstBlockCol+4,2,'images/barrier.png')
  let entrance2 = new Area ('entrance1',firstBlockRow+23,2,firstBlockCol+6.5,2,'images/barrier.png')
  let entrance3 = new Area ('entrance1',firstBlockRow+23,2,firstBlockCol+9,2,'images/barrier.png')*

  //let cashierArea =new Area("CashierArea", lastBlockRow+5, 2, firstBlockCol+12, 25, grid,"images/cashier_floor.png");

	areas = [test,walls,light1,oats,bread,directions,meat,cashier1,cashier2,cashier3,cashier4,cashier5,cashier6,seafood,detergent1,detergent2,fruits,fruits2,vegetables,open,cheese2
,drinks2,drinks3,bread2,sauces3,clothes1,clothes2,middleCold,iceCream,snowGlobe,tree,snowman,entrance1,entrance2,entrance3];*/

/*  areas = [walls,rightPole,leftPole,cashier1,cashier2,cashier3,iceCream,trolley1,trolley2,trolley3,
    open,trolley4,trolley5,trolley6,trolley7,trolley8,trolley9,entrance1,entrance2,snowGlobe,tree,snowman,
  oats,detergent1,bread,detergent2,roundSauces,
clothes1,clothes2,direction,
fruit1,fruit2,vegetable1,meat,seafood,fridge1,fridge2,fridge3,bread2]*/
  areas = [walls,iceCream, rightPole, leftPole, cashier1,cashier2,cashier3,bag1,bag2,bag3,trolley1,trolley2,trolley3,trolley4,trolley5,trolley6,trolley7,trolley8,trolley9,open,
  snowGlobe,tree,snowman,entrance1,entrance2,oats,detergent1,detergent2,roundSauces,bread,direction, clothes1,clothes2,fruit1,fruit2,vegetable1,seafood,meat,
  bread2,fridge1,fridge2,fridge3,shelvesitems1,shelvesitems2,shelvesitems3,shelvesitems4]
  //areas = [rightPole]

  const firstItemRow = firstBlockRow+6
  const firstItemCol = firstBlockCol



	let doctor = new Static(1,'Doctor',lastBlockRow+5,firstBlockCol+14,"images/cashier.png",grid)
	let receptionist = new Static(2,'Receptionist',receptionistRow,receptionistCol,"images/cashier.png",grid)
	/*let trolley1 = new Static(3,'Trolley',14,firstBlockCol,"images/trolley2.png",grid)
	let trolley2 = new Static(3,'Trolley',14,firstBlockCol+1,"images/trolley2.png",grid)
	let trolley3 = new Static(3,'Trolley',14,firstBlockCol+2,"images/trolley2.png",grid)
  let trolley4 = new Static(3,'Trolley',15,firstBlockCol,"images/trolley2.png",grid)
  let trolley5 = new Static(3,'Trolley',15,firstBlockCol+1,"images/trolley2.png",grid)
  let trolley6 = new Static(3,'Trolley',15,firstBlockCol+2,"images/trolley2.png",grid)
  let bag1 = new Static(3,'Bag1',3,firstBlockCol+13,"images/bags.png",grid)
	let milk = new Static(4,'Milk',firstItemRow,firstItemCol,"images/milk.png",grid)
	let cheese = new Static(5,'Cheese',firstItemRow+1,firstItemCol,"images/cheese.png",grid)
  let drinks = new Static(4,'Drinks',firstItemRow,firstItemCol+2,"images/signboard.png",grid)
  let basket = new Static(4,'Basket',firstBlockRow+2,firstBlockCol+3,"images/basket.png",grid)
  staticList = []
	//staticList = [trolley1,trolley2, trolley3,trolley4,trolley5, trolley6, basket,bag1]*/
  staticList = []




	// Re-initialize simulation letiables

	currentTime = 0;
	doctor.state=IDLE;
	/*statistics[0].cumulativeValue=0;
	statistics[0].count=0;
	statistics[1].cumulativeValue=0;
	statistics[1].count=0;
	statistics[2].cumulativeValue=0;
	statistics[2].count=0;*/
	patients = [];





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
  //.attr('transform', 'rotate(270)')

	//.style("fill", function(d) {return d.fillColor; })
	//.style("stroke", function(d) {return d.outlineColor})
	//.style("stroke-width", function(d) {return d.outlineWidth})



	// This function is used to create or update most of the svg elements on the drawing surface.
	// See the function removeDynamicAgents() for how we remove svg elements

	//Select all svg elements of class "patient" and map it to the data list called patients
	let allpatients = surface.selectAll(".patient").data(patients);

	// If the list of svg elements is longer than the data list, the excess elements are in the .exit() list
	// Excess elements need to be removed:
	allpatients.exit().remove(); //remove all svg elements associated with entries that are no longer in the data list
	// (This remove function is needed when we resize the window and re-initialize the patients array)

	// If the list of svg elements is shorter than the data list, the new elements are in the .enter() list.
	// The first time this is called, all the elements of data will be in the .enter() list.
	// Create an svg group ("g") for each new entry in the data list; give it class "patient"
	let newpatients = allpatients.enter().append("g").attr("class","patient");
	//Append an image element to each new patient svg group, position it according to the location data, and size it to fill a cell
	// Also note that we can choose a different image to represent the patient based on the patient type
	newpatients.append("svg:image")
	 .attr("x",function(d){let cell= getLocationCell(d.location); return cell.x+"px";})
	 .attr("y",function(d){let cell= getLocationCell(d.location); return cell.y+"px";})
	 .attr("width", Math.min(cellWidth,cellHeight)+"px")
	 .attr("height", Math.min(cellWidth,cellHeight)+"px")
	 .attr("xlink:href",function(d){return d.url});// Possible to change this to include two images

	// For the existing patients, we want to update their location on the screen
	// but we would like to do it with a smooth transition from their previous position.
	// D3 provides a very nice transition function allowing us to animate transformations of our svg elements.

	//First, we select the image elements in the allpatients list
	let images = allpatients.selectAll("image");
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



	// It would be nice to label the caregivers, so we add a text element to each new caregiver group
	/*newcaregivers.append("text")
    .attr("x", function(d) { let cell= getLocationCell(d.location); return (cell.x+cellWidth/2)+"px"; })
    .attr("y", function(d) { let cell= getLocationCell(d.location); return (cell.y+cellHeight)+"px"; })
    .attr("dy", ".35em")
    .text(function(d) { return d.label; });*/

	// The simulation should serve some purpose
	// so we will compute and display the average length of stay of each patient type.
	// We created the array "statistics" for this purpose.
	// Here we will create a group for each element of the statistics array (two elements)
	//let allstatistics = surface.selectAll(".statistics").data(statistics);
	//let newstatistics = allstatistics.enter().append("g").attr("class","statistics");
	// For each new statistic group created we append a text label
  /*
	newstatistics.append("text")
	.attr("x", function(d) { let cell= getLocationCell(d.location); return (cell.x+cellWidth)+"px"; })
	.attr("y", function(d) { let cell= getLocationCell(d.location); return (cell.y+cellHeight/2)+"px"; })
    .attr("dy", ".35em")
    .text("");

	// The data in the statistics array are always being updated.
	// So, here we update the text in the labels with the updated information.
	allstatistics.selectAll("text").text(function(d) {
		let avgLengthOfStay = d.cumulativeValue/(Math.max(1,d.count)); // cumulativeValue and count for each statistic are always changing
		return d.name+avgLengthOfStay.toFixed(1); }); //The toFixed() function sets the number of decimal places to display
*/
	// allstatistics.selectAll("text").text( d => d.rejected);



}

function generateDiscreteExpTime(rate) {
  let U = Math.random();
  let time_delta = (-Math.log(1 - U)) / rate;
  let next_time = Math.max(1, Math.round(time_delta)) // ensure discrete time
  return next_time;
}

function addDynamicAgents(){
  
  // 
	if (nextArrivalTime == currentTime){
    nextArrivalTime += generateDiscreteExpTime(rate);
    let initialRow = bottomRow - 1;
    let doorStartCol = 5;
    let doorLength = 5;
    let initialCol = Math.floor(Math.random() * doorLength + doorStartCol);

		let newpatient = new NonCollidingAgent(1, "A", initialRow, initialCol, grid,"images/girl.png");
    
    
		let customerType = Math.floor(Math.random()*5);
		switch (customerType) {
				case 0:
				    newpatient.type = "A";
						newpatient.url = "images/girl.png" ;
				break;

				case 1 :
				     newpatient.type = "B";
				     newpatient.url = "images/boy.png" ;
				break;

				case 2:
						newpatient.type = "C";
						newpatient.url = "images/old-woman.png" ;
				break;

				case 3 :
						 newpatient.type = "D";
						 newpatient.url = "images/minion.png" ;
				break;
				case 4 :
						 newpatient.type = "E";
						 newpatient.url = "images/family.png" ;

	}
	patients.push(newpatient);

}}

function updatePatient(patientIndex){
	//patientIndex is an index into the patients data array
	patientIndex = Number(patientIndex); //it seems patientIndex was coming in as a string
	let patient = patients[patientIndex];
	patient.move();

	if (patient.location.col == maxCols) {
		patient.state = EXITED;
	}
}

function removeDynamicAgents(){
	// We need to remove patients who have been discharged.
	//Select all svg elements of class "patient" and map it to the data list called patients
	let allCustomers = surface.selectAll(".patient").data(patients);
	//Select all the svg groups of class "patient" whose state is EXITED
	let exitingCustomers = allCustomers.filter(function(d,i){return d.state==EXITED;});
	// Remove the svg groups of EXITED patients: they will disappear from the screen at this point
	exitingCustomers.remove();

	// Remove the EXITED patients from the patients list using a filter command
	patients = patients.filter(function(d){return d.state!=EXITED;});
	// At this point the patients list should match the images on the screen one for one
	// and no patients should have state EXITED
}


function updateDynamicAgents(){
	// loop over all the agents and update their states
	for (let patientIndex in patients){
		updatePatient(patientIndex);
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
