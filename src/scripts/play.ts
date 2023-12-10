import fs from "node:fs";
import path from "node:path";
import KXLRC from "../index";
import playSound from "play-sound";

const lyrics = new KXLRC(fs.readFileSync(path.join(__dirname, "./../../../scripts/timestamp_result.json"), "utf-8"), false);
const startTime = Date.now();

playSound({ player: "cmdmp3" }).play(path.join(__dirname, "./../assets/No soy Eterno - 320.mp3"));

let time = 0;
let lastLyric: typeof lyrics.lyrics[number] | null = null;
setInterval(() => {
    const lyric = lyrics.getLyric(time);
    if (lyric && lastLyric !== lyric) {
        console.log(lyric.text)
        lastLyric = lyric;
    };
    time = Date.now() - startTime;
}, 10);
