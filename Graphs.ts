// This module is meant to be an implementation of an HTMLCanvas graphing API

// Global scope vars
var canv = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = canv.getContext("2d");


// Types
type Point = {
	x: number;
	y: number;
};
type AxisProps = {
	horizontal: boolean;
	origin: Point;
	pixelsPerValue: number; // A proportion relating on-screen pixels to an axis's max value
	width: number; // "lineWidth"
};

// DEFAULT AXIS STYLING PARAMS
var WIDTH = 3;
var INTERVALS = 5;
var STROKECOLOR = "black";
var TEXTCOLOR = "orange";

var TICKWIDTH = 2;
var TICKLENGTH = 15;
var TICKCOLOR = "black";


var FLIPPED = false;

export function drawHorizontalAxis(rightToLeft: boolean, length: number, max: number, origin: Point) { //TODO: styling params
	
	if (rightToLeft) length *= -1;

	// Set styles
	ctx.lineWidth = WIDTH;
	ctx.strokeStyle = STROKECOLOR;

	// Horizontal
	ctx.beginPath();
	ctx.moveTo(origin.x, origin.y);
	ctx.lineTo(origin.x + length, origin.y);
	ctx.closePath();
	ctx.stroke();
	
	// Draw tick marks
	ctx.lineWidth = TICKWIDTH;
	ctx.strokeStyle = TICKCOLOR;
	ctx.fillStyle = TEXTCOLOR;
	ctx.textAlign = "center";
	
	let intervalSpacing = length / INTERVALS;
	for (let i = 1; i <= INTERVALS; i++) {
		ctx.beginPath();
		ctx.moveTo(origin.x + intervalSpacing * i, origin.y + TICKLENGTH / 2);	
		ctx.lineTo(origin.x + intervalSpacing * i, origin.y - TICKLENGTH / 2);
		ctx.closePath();
		ctx.stroke();

		// Text Label
		ctx.fillText(
			i * (max / INTERVALS) + "", 
			origin.x + intervalSpacing * i, 
			origin.y + TICKLENGTH + 10);
	}
	// Return 'AxisProps'
	return {
		horizontal: true,
		origin: origin,
		pixelsPerValue : length / max,
		width: WIDTH
	};
}

export function drawVerticalAxis(topToBottom: boolean, length: number, max: number, origin: Point) { //TODO: styling params
	
	if (topToBottom) length *= -1;

	// Set styles
	ctx.lineWidth = WIDTH;
	ctx.strokeStyle = STROKECOLOR;
	
	// Vertical 
	ctx.beginPath();
	ctx.moveTo(origin.x, origin.y);
	ctx.lineTo(origin.x, origin.y - length);
	ctx.closePath();
	ctx.stroke();
	
	// Draw tick marks
	ctx.lineWidth = TICKWIDTH;
	ctx.strokeStyle = TICKCOLOR;
	ctx.fillStyle = TEXTCOLOR;
	ctx.textAlign = "right";
	
	let intervalSpacing = length / INTERVALS;
	for (let i = 1; i <= INTERVALS; i++) {
		ctx.beginPath();
		ctx.moveTo(origin.x + TICKLENGTH / 2, origin.y - intervalSpacing * i);	
		ctx.lineTo(origin.x - TICKLENGTH / 2, origin.y - intervalSpacing * i);
		ctx.closePath();
		ctx.stroke();

		// Text Label
		ctx.fillText(
			i * (max / INTERVALS) + "", 
			origin.x - TICKLENGTH - 6, 
			origin.y - intervalSpacing * i);
	}
	// Return 'AxisProps'
	return {
		horizontal: true,
		origin: origin,
		pixelsPerValue : length / max,
		width: WIDTH
	};
}



// DEFAULT DATA DRAWING STYLING PARAMS
var POINTCOLOR = "blue";

export function drawPoint(datum: Point, indexAxis: AxisProps, valueAxis: AxisProps, radius: number = 2) {
	ctx.fillStyle = POINTCOLOR;
	
	// TODO: branch code to draw either a square OR a circle, based on a boolean parameter
	ctx.fillRect(
		indexAxis.origin.x + (datum.x * indexAxis.pixelsPerValue) - radius, 
		valueAxis.origin.y - (datum.y * valueAxis.pixelsPerValue) - radius, 
		radius * 2, 
		radius * 2);
	
}

export function drawBar(datum: Point, indexAxis: AxisProps, valueAxis: AxisProps, width: number = 8) { //TODO: styling params
	ctx.fillStyle = POINTCOLOR;

	ctx.fillRect(
		indexAxis.origin.x + (datum.x * indexAxis.pixelsPerValue) - (width / 2),
		valueAxis.origin.y - (datum.y * valueAxis.pixelsPerValue),
		width,
		datum.y * valueAxis.pixelsPerValue - (indexAxis.width / 2));

}

// DEBUGGING FUNCTIONS
export function drawCrossAxis(datum: Point, indexAxis: AxisProps, valueAxis: AxisProps) {
	ctx.strokeStyle = "pink";
	ctx.lineWidth = 0.5;

	// Vertical line
	ctx.beginPath();
	ctx.moveTo(indexAxis.origin.x + (datum.x * indexAxis.pixelsPerValue), valueAxis.origin.y);
	ctx.lineTo(indexAxis.origin.x + (datum.x * indexAxis.pixelsPerValue), valueAxis.origin.y - (datum.y * valueAxis.pixelsPerValue));
	ctx.closePath();
	ctx.stroke();
	
	// Horizontal line
	ctx.beginPath();
	ctx.moveTo(indexAxis.origin.x, valueAxis.origin.y - (datum.y * valueAxis.pixelsPerValue));
	ctx.lineTo(indexAxis.origin.x + (datum.x * indexAxis.pixelsPerValue), valueAxis.origin.y - (datum.y * valueAxis.pixelsPerValue));
	ctx.closePath();
	ctx.stroke();
}