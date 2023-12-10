import KXLRC from "..";
import fs from "node:fs";
import path from "node:path";
import msgpackr from "msgpackr";

const lyricsPath = path.join(__dirname, "./../../scripts/timestamp_result.json");
const lyricsText = fs.readFileSync(lyricsPath, "utf-8");
const lyricsJSON = JSON.parse(lyricsText);
const lyricsMsgPack = msgpackr.encode(lyricsJSON);

describe("KXLRC Constructor", () => {
    test("Parses JSON Text", () => {
        const kxlrc = new KXLRC(lyricsText);
        expect(kxlrc.lyrics).toEqual(lyricsJSON);
    });

    test("Parses JSON Object", () => {
        const kxlrc = new KXLRC(lyricsJSON);
        expect(kxlrc.lyrics).toEqual(lyricsJSON);
    });

    test("Parses MsgPack", () => {
        const kxlrc = new KXLRC(lyricsMsgPack);
        expect(kxlrc.lyrics).toEqual(lyricsJSON);
    });

    test("Throws Error on Invalid Input", () => {
        expect(() => new KXLRC("invalid")).toThrow();
    });
});

describe("KXLRC.parse", () => {
    test("Parses JSON Text", () => {
        const kxlrc = KXLRC.parse(lyricsText);
        expect(kxlrc).toEqual(lyricsJSON);
    });

    test("Parses JSON Object", () => {
        const kxlrc = KXLRC.parse(lyricsJSON);
        expect(kxlrc).toEqual(lyricsJSON);
    });

    test("Parses MsgPack", () => {
        const kxlrc = KXLRC.parse(lyricsMsgPack);
        expect(kxlrc).toEqual(lyricsJSON);
    });

    test("Throws Error on Invalid Input", () => {
        expect(() => KXLRC.parse("invalid")).toThrow();
    });
});

describe("KXLRC.stringify", () => {
    test("Stringifies to JSON", () => {
        expect(new KXLRC(lyricsJSON).toString()).toEqual(JSON.stringify(lyricsJSON));
    });

    test("Stringifies (packs) to MsgPack", () => {
        expect(new KXLRC(lyricsJSON).pack().toString("hex")).toEqual(lyricsMsgPack.toString("hex"));
    });
});