import KXLRC from "..";
import fs from "node:fs";
import path from "node:path";
import msgpackr from "msgpackr";

const lyricsPath = path.join(__dirname, "./../../scripts/timestamp_result.json");
const lyricsText = fs.readFileSync(lyricsPath, "utf-8");
const lyricsJSON = JSON.parse(lyricsText);
const lyricsMsgPack = msgpackr.encode(lyricsJSON);

const kxlrc = new KXLRC(lyricsJSON);
kxlrc.edit({text: [{text: "hi"}]}, 0);

console.log(JSON.stringify(kxlrc.lyrics![0], null, 4));