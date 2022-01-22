import { 
	drawHorizontalAxis,
	drawVerticalAxis,
	drawPoint,
	drawBar,
	drawCrossAxis
	} from "../Graphs.js";



var myOrigin = {x: 150, y: 400};

// Axes drawing
let horiz = drawHorizontalAxis(false, 250, 20, myOrigin); // Horizontal axis
let vert = drawVerticalAxis(false, 250, 100, myOrigin); // Vertical axis

// 'Data' (test points) drawing
var testPoint = {x: 8, y: 80};
// drawPoint(testPoint, horiz, vert, 8);
drawBar(testPoint, horiz, vert);
drawBar({x: 10, y: 65}, horiz, vert);
drawBar({x:11, y: 75}, horiz, vert);
drawBar({x:9, y: 81}, horiz, vert);
drawCrossAxis(testPoint, horiz, vert);


