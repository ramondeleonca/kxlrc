"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KXLRC = void 0;
var msgpackr_1 = __importDefault(require("msgpackr"));
var types_1 = require("./types");
var events_1 = require("events");
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
var KXLRC = /** @class */ (function (_super) {
    __extends(KXLRC, _super);
    /**
     * Create a new KXLRC instance
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     */
    function KXLRC(lyrics, packed) {
        if (packed === void 0) { packed = true; }
        var _this = _super.call(this) || this;
        /**
         * Parsed lyrics array
         */
        _this.lyrics = null;
        /**
         * Add a lyric to the lyrics array (alias for add)
         * @param lyric The lyric to add
         * @example
         * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
         * lyrics.add({ text: "Hello World!" });
         * console.log(lyrics);
         */
        _this.addLyric = _this.add;
        /**
         * Edit a lyric in the lyrics array (alias for edit)
         * @param lyric The lyric to edit
         * @param index The index of the lyric to edit
         * @example
         * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
         * lyrics.edit({ text: "Hello World!" }, 0);
         * console.log(lyrics);
         */
        _this.editLyric = _this.edit;
        /**
         * Remove a lyric from the lyrics array (alias for remove)
         * @param lyric The lyric to remove
         * @example
         * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
         * lyrics.remove({ text: "Hello World!" });
         * console.log(lyrics);
         */
        _this.removeLyric = _this.remove;
        _this[_a] = "KXLRC";
        if (lyrics) {
            _this.lyrics = KXLRC.parse(lyrics, packed);
            _this.emit("parsed", { detail: { lyrics: _this.lyrics } });
            _this.emit("any", { detail: { lyrics: _this.lyrics } });
        }
        return _this;
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
     * @param index The index to add the lyric at
     * @param fillTimestamp Whether to fill the timestamp of the lyric or not
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.add({ text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.prototype.add = function (lyric, index, fillTimestamp) {
        var _b, _c, _d;
        if (fillTimestamp === void 0) { fillTimestamp = true; }
        if (!this.lyrics)
            this.lyrics = [];
        if (index)
            (_b = this.lyrics) === null || _b === void 0 ? void 0 : _b.splice(index, 0, types_1.KXLRCLine.parse(__assign(__assign({}, lyric), { timestamp: fillTimestamp && this.lyrics[index - 1] && this.lyrics[index + 1] ? Math.ceil((((_c = this.lyrics[index - 1]) === null || _c === void 0 ? void 0 : _c.timestamp) + ((_d = this.lyrics[index + 1]) === null || _d === void 0 ? void 0 : _d.timestamp)) / 2) : lyric.timestamp })));
        else
            this.lyrics.push(types_1.KXLRCLine.parse(lyric));
        this.emit("added", { detail: { lyric: this.lyrics[index], index: index } });
        this.emit("any", { detail: { lyric: this.lyrics[index], index: index } });
    };
    /**
     * Add a lyric to the lyrics array
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @param index The index to add the lyric at
     * @param fillTimestamp Whether to fill the timestamp of the lyric or not
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    KXLRC.add = function (lyrics, lyric, index, fillTimestamp) {
        var _b, _c;
        if (fillTimestamp === void 0) { fillTimestamp = true; }
        if (index)
            types_1.KXLRCLyrics.parse(lyrics).splice(index, 0, types_1.KXLRCLine.parse(__assign(__assign({}, lyric), { timestamp: fillTimestamp && lyrics[index - 1] && lyrics[index + 1] ? Math.ceil((((_b = lyrics[index - 1]) === null || _b === void 0 ? void 0 : _b.timestamp) + ((_c = lyrics[index + 1]) === null || _c === void 0 ? void 0 : _c.timestamp)) / 2) : lyric.timestamp })));
        else
            types_1.KXLRCLyrics.parse(lyrics).push(types_1.KXLRCLine.parse(lyric));
    };
    /**
     * Edit a lyric in the lyrics array
     * @param lyric The lyric to edit
     * @param index The index of the lyric to edit
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.edit({ text: "Hello World!" }, 0);
     * console.log(lyrics);
     */
    KXLRC.prototype.edit = function (lyric, index) {
        if (!this.lyrics)
            this.lyrics = [];
        this.lyrics[index] = types_1.KXLRCLine.parse(__assign(__assign({}, (this.lyrics[index] ? this.lyrics[index] : {})), lyric));
        this.emit("edited", { detail: { lyric: this.lyrics[index], index: index } });
        this.emit("any", { detail: { lyric: this.lyrics[index], index: index } });
    };
    /**
     * Edit a lyric in the lyrics array
     * @param lyrics The lyrics to edit the lyric in
     * @param lyric The lyric to edit
     * @param index The index of the lyric to edit
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.edit(lyrics, { text: "Hello World!" }, 0);
     * console.log(lyrics);
     */
    KXLRC.edit = function (lyrics, lyric, index) {
        types_1.KXLRCLyrics.parse(lyrics)[index] = types_1.KXLRCLine.parse(__assign(__assign({}, (lyrics[index] ? lyrics[index] : {})), lyric));
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
        var _b;
        var index = typeof lyric === "number" ? lyric : (_b = this.lyrics) === null || _b === void 0 ? void 0 : _b.indexOf(lyric);
        if (index === -1)
            return;
        lyric = this.lyrics[index];
        if (this.lyrics && typeof lyric === 'number')
            this.lyrics = this.lyrics.filter(function (_, i) { return i !== lyric; });
        else
            this.lyrics = this.lyrics.filter(function (_, i) { return i !== index; });
        this.emit("removed", { detail: { lyric: lyric, index: index } });
        this.emit("any", { detail: { lyric: lyric, index: index } });
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
    KXLRC.prototype.on = function (eventName, listener) {
        return _super.prototype.on.call(this, eventName, listener);
    };
    KXLRC.prototype.addListener = function (eventName, listener) {
        return _super.prototype.addListener.call(this, eventName, listener);
    };
    KXLRC.prototype.off = function (eventName, listener) {
        return _super.prototype.off.call(this, eventName, listener);
    };
    KXLRC.prototype.removeListener = function (eventName, listener) {
        return _super.prototype.removeListener.call(this, eventName, listener);
    };
    KXLRC.prototype.once = function (eventName, listener) {
        return _super.prototype.once.call(this, eventName, listener);
    };
    KXLRC.prototype.prependListener = function (eventName, listener) {
        return _super.prototype.prependListener.call(this, eventName, listener);
    };
    KXLRC.prototype.prependOnceListener = function (eventName, listener) {
        return _super.prototype.prependOnceListener.call(this, eventName, listener);
    };
    KXLRC.prototype.removeAllListeners = function (eventName) {
        return _super.prototype.removeAllListeners.call(this, eventName);
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
     * Edit a lyric in the lyrics array (alias for edit)
     * @param lyrics The lyrics to edit the lyric in
     * @param lyric The lyric to edit
     * @param index The index of the lyric to edit
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.edit(lyrics, { text: "Hello World!" }, 0);
     * console.log(lyrics);
     */
    KXLRC.editLyric = KXLRC.edit;
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
}(events_1.EventEmitter));
exports.KXLRC = KXLRC;
exports.default = KXLRC;
;
//# sourceMappingURL=index.js.map