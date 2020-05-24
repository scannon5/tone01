import * as Tone from "tone";

export function init() {
    const bassdrum = new Tone.MembraneSynth().toMaster();
 
    function triggerSynth(time){
        //the time is the sample-accurate time of the event
        bassdrum.triggerAttackRelease('C2', '8n', time)
    }
    
    //schedule a few notes
    Tone.Transport.schedule(triggerSynth, '0:0')
    Tone.Transport.schedule(triggerSynth, '0:1')
    Tone.Transport.schedule(triggerSynth, '0:2')
    Tone.Transport.schedule(triggerSynth, '0:3')
    
    
    //set the transport to repeat
    Tone.Transport.loopEnd = '1m';
    Tone.Transport.loop = true;

    document.querySelector("body").addEventListener("keydown", e => Tone.Transport.toggle());
}

