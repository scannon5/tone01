
export interface GridOptions {
    x: number;
    y: number;
    rows: number;
    cols: number;
    cellSize: number;
    padding: number;
}

export class Grid {

    ctx: any;
    cellStates: number[][];

    constructor (private canvas: any, private opt: GridOptions) {
        this.init();
    }

    init() {
        this.canvas.width = this.opt.cellSize * this.opt.cols;
        this.canvas.height = this.opt.cellSize * this.opt.rows;

        this.ctx = this.canvas.getContext("2d");
        this.cellStates = new Array(this.opt.cols);
        this.ctx.strokeStyle = "#aaa";

        this.canvas.addEventListener("click", this.clickHandler);
        //this.canvas.addEventListener("mousemove", moveHandler);
    
        this.initGrid();
        this.clearGrid();
        this.drawGrid();
    }

    

    initGrid() {
        for (var x = 0; x < this.opt.cols; x++) {
            this.cellStates[x] = new Array(this.opt.rows);
        }
    }

    clearGrid() {
        for (var x = 0; x < this.opt.cols; x++) {
            for (var y = 0; y < this.opt.rows; y++) {
                this.cellStates[x][y] = 0;
            }
        }        
    }

    drawGrid() {
        var stateToStyle = (x: number, y: number) => {
            switch (this.cellStates[x][y])
            {
                case 0: return "#aaa";
                case 1: return "#f77";
                case 2: return "#888";
                default: return "#000";
            }
        }
        for (var x = 0; x < this.opt.cols; x++) {
            for (var y = 0; y < this.opt.rows; y++) {
                this.ctx.fillStyle = stateToStyle(x, y);
                this.ctx.fillRect(
                    x * this.opt.cellSize + this.opt.padding, 
                    y * this.opt.cellSize + this.opt.padding, 
                    this.opt.cellSize - (2 * this.opt.padding), 
                    this.opt.cellSize - (2 * this.opt.padding));
            }
        }            
    }

    getCell = (x: number, y: number) => {
        return {
            x: Math.floor(x / this.opt.cellSize),
            y: Math.floor(y / this.opt.cellSize)
        }; 
    }

    clickHandler = (e: any) => {
        var c = this.getCell(e.x, e.y);
        this.cellStates[c.x][c.y] = this.cellStates[c.x][c.y] == 0 ? 1 : 0;
        this.drawGrid();
    }

    // moveHandler(e: any) {
    //     var c = this.getCell(e.x, e.y);
    //     //console.log(c);
    //     //clearGrid();
    //     //this.cellStates[c.x][c.y] = 2;

    //     //drawGrid();
    //     //console.log(e);
    //     //console.log(`${e.clientX},${e.clientY}`);

    //     //ctx.strokeRect(e.x - 5, e.y - 5, 10, 10);
    // }

    
}