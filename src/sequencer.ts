import * as Tone from "tone";
import { Grid } from "./grid";

export class Sequencer {

    bassdrum: any;
    hihat: any;

    constructor() {
        this.init();

        //set the transport to repeat
        Tone.Transport.loopEnd = '1m';
        Tone.Transport.loop = true;

        document.querySelector("body").addEventListener("keydown", e => Tone.Transport.toggle());
    }

    private init() {
        this.bassdrum = new Tone.MembraneSynth().toMaster();
        this.hihat = new Tone.NoiseSynth().toMaster();
    }

    private triggerBassdrum = (time: any) => {
        this.bassdrum.triggerAttackRelease('C2', '8n', time)
    }
    private triggerHihat = (time: any) => {
        this.hihat.triggerAttackRelease('4n', time)
    }

    public update(grid: Grid) {
        Tone.Transport.cancel();
        
        let assign = (track: number, callback: any) => {
            for (let n = 0; n < 4; n++) {
                for (let s = 0; s < 4; s++) {
                    if (grid.cellStates[track][n * 4 + s] == 1) {
                        Tone.Transport.schedule(callback, `0:${n}:${s}`);
                    }
                }
            }
        }

        assign(0, this.triggerBassdrum);
        assign(1, this.triggerHihat);

    }

}