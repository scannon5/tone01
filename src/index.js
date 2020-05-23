import * as Tone from "tone";

async function play() {
    await Tone.start();
    const synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease("C4", "2n");
}

document.querySelector("#playButton").addEventListener('click', play);