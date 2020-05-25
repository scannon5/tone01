import { canvasTest } from './canvas';
import { initPiano } from './piano';
import { Sequencer } from './sequencer';
import { Grid } from './grid';
import './style.css';

//canvasTest();
initPiano();
var seq = new Sequencer();

var onGridChange = (grid: Grid) => {
    seq.update(grid);
}

var grid = new Grid(document.getElementById("canvas1"), {
    x: 100,
    y: 100,
    rows: 2,
    cols: 16,
    cellSize: 60,
    padding: 2,
    onChange: onGridChange
});

grid.cellStates[0][0] = 1;
grid.cellStates[0][4] = 1;
grid.cellStates[0][8] = 1;
grid.cellStates[0][12] = 1;

grid.cellStates[1][2] = 1;
grid.cellStates[1][6] = 1;
grid.cellStates[1][10] = 1;
grid.cellStates[1][14] = 1;

grid.drawGrid();

onGridChange(grid);