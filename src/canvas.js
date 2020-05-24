export function canvasTest() {
    var canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext("2d");

    //console.log(canvas.)

    var cellSize = 50;
    var gridWidth = 10;
    var gridHeight = 10;
    var padding = 2;
    var cellStates = new Array(gridWidth);

    ctx.strokeStyle = "#aaa";

    function initGrid() {
        for (var x = 0; x < gridWidth; x++) {
            cellStates[x] = new Array(gridHeight);
        }
    }

    function clearGrid() {
        for (var x = 0; x < gridWidth; x++) {
            for (var y = 0; y < gridHeight; y++) {
                cellStates[x][y] = 0;
            }
        }        
    }

    function drawGrid() {
        function stateToStyle(x, y) {
            switch (cellStates[x][y])
            {
                case 0: return "#aaa";
                case 1: return "#f77";
                case 2: return "#888";
                default: return "#000";
            }
        }
        for (var x = 0; x < gridWidth; x++) {
            for (var y = 0; y < gridHeight; y++) {
                ctx.fillStyle = stateToStyle(x, y);
                ctx.fillRect(x * cellSize + padding, y * cellSize + padding, cellSize - (2 * padding), cellSize - (2 * padding));
            }
        }            
    }

    function getCell(x, y) {
        return {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize)
        }; 
    }

    function clickHandler(e) {
        //console.log(e);
        //console.log(`${e.clientX},${e.clientY}`);

        var c = getCell(e.x, e.y);

        cellStates[c.x][c.y] = cellStates[c.x][c.y] == 0 ? 1 : 0;
        drawGrid();
    }

    function moveHandler(e) {

        var c = getCell(e.x, e.y);
        //console.log(c);
        //clearGrid();
        //cellStates[c.x][c.y] = 2;

        //drawGrid();
        //console.log(e);
        //console.log(`${e.clientX},${e.clientY}`);

        //ctx.strokeRect(e.x - 5, e.y - 5, 10, 10);
    }

    canvas.addEventListener("click", clickHandler);
    canvas.addEventListener("mousemove", moveHandler);

    initGrid();
    clearGrid();
    drawGrid();
    

}