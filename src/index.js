import * as Tone from "tone";

const synth = new Tone.Synth().toMaster();

async function play() {
    synth.triggerAttackRelease("C4", "2n");
}

function translateKey(key) {
    switch (key)
    {
        case "a": return "C4";
        case "s": return "D4";
        case "d": return "E4";
        case "f": return "F4";
        case "g": return "G4";
        case "h": return "A4";
        case "j": return "B4";
        case "k": return "C5";
        default: return null;
    }
}

function startNote(e) {
    var note = translateKey(e.key);
    if (note) {
        synth.triggerAttack(note, Tone.context.currentTime);
    }
}

function endNote() {
    synth.triggerRelease();
}

document.querySelector("#playButton").addEventListener('click', play);

document.querySelector("body").addEventListener("keydown", startNote);
document.querySelector("body").addEventListener("keyup", endNote);
