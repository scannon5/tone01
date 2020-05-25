
export interface GridOptions {
    x: number;
    y: number;
    rows: number;
    cols: number;
    cellSize: number;
    padding: number;
    onChange?: (grid: Grid) => void;
}

export class Grid {

    ctx: any;
    public cellStates: number[][];

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
        for (var r = 0; r < this.opt.rows; r++) {
            this.cellStates[r] = new Array(this.opt.cols);
        }
    }

    clearGrid() {
        for (var r = 0; r < this.opt.rows; r++) {
            for (var c = 0; c < this.opt.cols; c++) {
                this.cellStates[r][c] = 0;
            }
        }        
    }

    drawGrid() {
        var stateToStyle = (r: number, c: number) => {
            switch (this.cellStates[r][c])
            {
                case 0: return "#aaa";
                case 1: return "#f77";
                case 2: return "#888";
                default: return "#000";
            }
        }
        for (var r = 0; r < this.opt.rows; r++) {
            for (var c = 0; c < this.opt.cols; c++) {
                this.ctx.fillStyle = stateToStyle(r, c);
                this.ctx.fillRect(
                    c * this.opt.cellSize + this.opt.padding, 
                    r * this.opt.cellSize + this.opt.padding, 
                    this.opt.cellSize - (2 * this.opt.padding), 
                    this.opt.cellSize - (2 * this.opt.padding));
            }
        }            
    }

    getCell = (x: number, y: number) => {
        return {
            c: Math.floor(x / this.opt.cellSize),
            r: Math.floor(y / this.opt.cellSize)
        }; 
    }

    clickHandler = (e: any) => {
        var cell = this.getCell(e.x, e.y);
        this.cellStates[cell.r][cell.c] = this.cellStates[cell.r][cell.c] == 0 ? 1 : 0;
        this.drawGrid();
        this.callChangeHandler();
    }

    private callChangeHandler() {
        if (this.opt.onChange) {
            this.opt.onChange(this);
        }
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