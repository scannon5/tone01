import { canvasTest } from './canvas';
import { initPiano } from './piano';
import { init as init_seq } from './sequencer';
import { Grid } from './grid';
import './style.css';

//canvasTest();
initPiano();
init_seq();

var grid = new Grid(document.getElementById("canvas1"), {
    x: 100,
    y: 100,
    rows: 4,
    cols: 16,
    cellSize: 30,
    padding: 1,
});
