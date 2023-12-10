"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KXLRC = void 0;
var msgpackr_1 = __importDefault(require("msgpackr"));
var types_1 = require("./types");
/**
 * A class for parsing and manipulating KXLRC lyrics
 * @example
 * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
 * @example
 * const lyrics = new KXLRC();
 * lyrics.add({ text: "Hello World!" });
 * @example
 * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
 */
var KXLRC = /** @class */ (function () {
    /**
     * Create a new KXLRC instance
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     */
    function KXLRC(lyrics, packed) {
        if (packed === void 0) { packed = true; }
        /**
         * Parsed lyrics array
         */
        this.lyrics = null;
        /**
         * Add a lyric to the lyrics array (alias for add)
         * @param lyric The lyric to add
         * @example
         * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
         * lyrics.add({ text: "Hello World!" });
         * console.log(lyrics);
         */
        this.addLyric = this.add;
        /**
         * Remove a lyric from the lyrics array (alias for remove)
         * @param lyric The lyric to remove
         * @example
         * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
         * lyrics.remove({ text: "Hello World!" });
         * console.log(lyrics);
         */
        this.removeLyric = this.remove;
        this[_a] = "KXLRC";
        if (lyrics)
            this.lyrics = KXLRC.parse(lyrics, packed);
    }
    /**
     * Parse the lyrics to a KXLRCLyrics array
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @returns The parsed lyrics
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * console.log(lyrics);
     */
    KXLRC.parse = function (lyrics, packed) {
        if (packed === void 0) { packed = true; }
        // Lyrics are a string
        if (typeof lyrics === 'string') {
            // Lyrics are a stringified JSON Array
            return types_1.KXLRCLyrics.parse(JSON.parse(lyrics));
        }
        else if (Array.isArray(lyrics)) {
            // Lyrics are an array
            return types_1.KXLRCLyrics.parse(lyrics);
        }
        else if (lyrics instanceof Buffer || lyrics instanceof Uint8Array) {
            // Lyrics are a buffer
            // Lyrics are packed as messagepack
            if (packed)
                return types_1.KXLRCLyrics.parse(msgpackr_1.default.decode(lyrics));
            // Lyrics are a JSON array in a string in a buffer
            else
                return types_1.KXLRCLyrics.parse(JSON.parse(lyrics.toString()));
        }
        ;
        throw new Error("Invalid lyrics");
    };
    /**
     * Add a lyric to the lyrics array
     * @param lyric The lyric to add
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.add({ text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.prototype.add = function (lyric) {
        if (!this.lyrics)
            this.lyrics = [];
        this.lyrics.push(types_1.KXLRCLine.parse(lyric));
    };
    /**
     * Add a lyric to the lyrics array
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.add = function (lyrics, lyric) {
        types_1.KXLRCLyrics.parse(lyrics).push(types_1.KXLRCLine.parse(lyric));
    };
    /**
     * Remove a lyric from the lyrics array
     * @param lyric The lyric to remove
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.remove({ text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.prototype.remove = function (lyric) {
        if (this.lyrics && typeof lyric === 'number')
            this.lyrics = this.lyrics.filter(function (_, i) { return i !== lyric; });
        else
            this.lyrics = this.lyrics.filter(function (l) { return l !== lyric; });
    };
    /**
     * Remove a lyric from the lyrics array
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.remove = function (lyrics, lyric) {
        if (typeof lyric === 'number')
            return types_1.KXLRCLyrics.parse(lyrics).filter(function (_, i) { return i !== lyric; });
        else
            return types_1.KXLRCLyrics.parse(lyrics).filter(function (l) { return l !== lyric; });
    };
    /**
     * Get the lyric at a given time
     * @param time The time to search for
     * @param lyrics The lyrics to search through
     * @returns The lyric at the given time, or null if the time is before the first timestamp in the array
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * const lyric = lyrics.getLyric(1000);
     * console.log(lyric);
     */
    KXLRC.prototype.getLyric = function (time, lyrics) {
        if (lyrics === void 0) { lyrics = this.lyrics; }
        if (!lyrics)
            return null;
        return KXLRC.getLyric(lyrics, time);
    };
    /**
     * Get the lyric at a given time
     * @param lyrics The lyrics to search through
     * @param time The time to search for
     * @returns The lyric at the given time, or null if the time is before the first timestamp in the array
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * const lyric = KXLRC.getLyric(lyrics, 1000);
     * console.log(lyric);
     */
    KXLRC.getLyric = function (lyrics, time) {
        var low = 0;
        var high = lyrics.length - 1;
        while (low <= high) {
            var mid = Math.floor((low + high) / 2);
            var midTimestamp = lyrics[mid].timestamp;
            if (midTimestamp === time) {
                return lyrics[mid];
            }
            else if (midTimestamp < time) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        // If the exact timestamp is not found, return the lyric of the closest timestamp
        // that is less than or equal to the given time
        if (high >= 0 && high < lyrics.length)
            return lyrics[high];
        // If the given time is before the first timestamp in the array, return null or a default value
        return null;
    };
    /**
     * Pack the lyrics array as messagepack
     *
     * (Messagepack is a binary serialization format that is smaller and faster than JSON)
     *
     * @returns The packed lyrics
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * const packed = lyrics.pack();
     * console.log(packed);
     */
    KXLRC.prototype.pack = function () {
        return msgpackr_1.default.encode(this.lyrics);
    };
    /**
     * Stringify the lyrics array
     * @returns The stringified lyrics
     */
    KXLRC.prototype.toString = function () {
        return JSON.stringify(this.lyrics);
    };
    /**
     * Stringify the lyrics array
     * @param lyrics The lyrics to stringify
     * @returns The stringified lyrics
     */
    KXLRC.stringify = function (lyrics) {
        return JSON.stringify(lyrics);
    };
    KXLRC.prototype[Symbol.iterator] = function () { return this.lyrics[Symbol.iterator](); };
    KXLRC.prototype[(_a = Symbol.toStringTag, Symbol.toPrimitive)] = function (hint) {
        if (hint === 'string')
            return JSON.stringify(this.lyrics, null, 4);
        else
            return this.lyrics;
    };
    var _a;
    /**
     * Add a lyric to the lyrics array (alias for add)
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.addLyric = KXLRC.add;
    /**
     * Remove a lyric from the lyrics array (alias for remove)
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.removeLyric = KXLRC.remove;
    return KXLRC;
}());
exports.KXLRC = KXLRC;
exports.default = KXLRC;
;
//# sourceMappingURL=index.js.map