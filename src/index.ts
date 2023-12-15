import msgpackr from 'msgpackr';
import { z } from 'zod';
import { KXLRCLyrics, KXLRCLine } from './types';

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
export default class KXLRC {
    /**
     * Parsed lyrics array
     */
    lyrics: z.infer<typeof KXLRCLyrics> | null = null;

    /**
     * Create a new KXLRC instance
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     */
    constructor(lyrics?: z.infer<typeof KXLRCLyrics> | string | Buffer | Uint8Array, packed = true) {
        if (lyrics) this.lyrics = KXLRC.parse(lyrics, packed);
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
    public static parse(lyrics: z.infer<typeof KXLRCLyrics> | string | Buffer | Uint8Array | any[], packed = true): z.infer<typeof KXLRCLyrics> | null {
        // Lyrics are a string
        if (typeof lyrics === 'string') {
            // Lyrics are a stringified JSON Array
            return KXLRCLyrics.parse(JSON.parse(lyrics));
        } else if (Array.isArray(lyrics)) {
            // Lyrics are an array
            return KXLRCLyrics.parse(lyrics);
        } else if (lyrics instanceof Buffer || lyrics instanceof Uint8Array) {
            // Lyrics are a buffer
            // Lyrics are packed as messagepack
            if (packed) return KXLRCLyrics.parse(msgpackr.decode(lyrics));
            // Lyrics are a JSON array in a string in a buffer
            else return KXLRCLyrics.parse(JSON.parse(lyrics.toString()));
        };
        throw new Error("Invalid lyrics");
    }

    /**
     * Add a lyric to the lyrics array
     * @param lyric The lyric to add
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.add({ text: "Hello World!" });
     * console.log(lyrics);
     */
    public add(lyric: z.infer<typeof KXLRCLine>, index?: number, fillTimestamp = true) {
        if (!this.lyrics) this.lyrics = [];
        if (index) this.lyrics?.splice(index, 0, KXLRCLine.parse({...lyric, timestamp: fillTimestamp && this.lyrics[index - 1] && this.lyrics[index + 1] ? Math.ceil((this.lyrics[index - 1]?.timestamp + this.lyrics[index + 1]?.timestamp) / 2) : lyric.timestamp}));
        else this.lyrics.push(KXLRCLine.parse(lyric));
    }

    /**
     * Add a lyric to the lyrics array (alias for add)
     * @param lyric The lyric to add
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.add({ text: "Hello World!" });
     * console.log(lyrics);
     */
    public addLyric = this.add;

    /**
     * Add a lyric to the lyrics array
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    public static add(lyrics: z.infer<typeof KXLRCLyrics>, lyric: z.infer<typeof KXLRCLine>, index?: number, fillTimestamp = true) {
        if (index) KXLRCLyrics.parse(lyrics).splice(index, 0, KXLRCLine.parse({...lyric, timestamp: fillTimestamp && lyrics[index - 1] && lyrics[index + 1] ? Math.ceil((lyrics[index - 1]?.timestamp + lyrics[index + 1]?.timestamp) / 2) : lyric.timestamp}));
        else KXLRCLyrics.parse(lyrics).push(KXLRCLine.parse(lyric));
    }

    /**
     * Add a lyric to the lyrics array (alias for add)
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    public static addLyric = KXLRC.add;

    /**
     * Remove a lyric from the lyrics array
     * @param lyric The lyric to remove
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.remove({ text: "Hello World!" });
     * console.log(lyrics);
     */
    public remove(lyric: z.infer<typeof KXLRCLine> | number) {
        if (this.lyrics && typeof lyric === 'number') this.lyrics = this.lyrics.filter((_, i) => i !== lyric);
        else this.lyrics = this.lyrics.filter(l => l !== lyric);
    }

    /**
     * Remove a lyric from the lyrics array (alias for remove)
     * @param lyric The lyric to remove
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.remove({ text: "Hello World!" });
     * console.log(lyrics);
     */
    public removeLyric = this.remove;

    /**
     * Remove a lyric from the lyrics array
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    public static remove(lyrics: z.infer<typeof KXLRCLyrics>, lyric: z.infer<typeof KXLRCLine> | number) {
        if (typeof lyric === 'number') return KXLRCLyrics.parse(lyrics).filter((_, i) => i !== lyric);
        else return KXLRCLyrics.parse(lyrics).filter(l => l !== lyric);
    }

    /**
     * Remove a lyric from the lyrics array (alias for remove)
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    public static removeLyric = KXLRC.remove;

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
    public getLyric(time: number, lyrics = this.lyrics): z.infer<typeof KXLRCLine> | null {
        if (!lyrics) return null;
        return KXLRC.getLyric(lyrics, time);
    }

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
    public static getLyric(lyrics: z.infer<typeof KXLRCLyrics>, time: number): z.infer<typeof KXLRCLine> | null {
        let low = 0;
        let high = lyrics.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midTimestamp = lyrics[mid].timestamp;

            if (midTimestamp === time) {
                return lyrics[mid];
            } else if (midTimestamp < time) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // If the exact timestamp is not found, return the lyric of the closest timestamp
        // that is less than or equal to the given time
        if (high >= 0 && high < lyrics.length) return lyrics[high];

        // If the given time is before the first timestamp in the array, return null or a default value
        return null;
    }

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
    public pack() {
        return msgpackr.encode(this.lyrics);
    }

    /**
     * Stringify the lyrics array
     * @returns The stringified lyrics
     */
    public toString() {
        return JSON.stringify(this.lyrics);
    }

    /**
     * Stringify the lyrics array
     * @param lyrics The lyrics to stringify
     * @returns The stringified lyrics
     */
    public static stringify(lyrics: z.infer<typeof KXLRCLyrics>) {
        return JSON.stringify(lyrics);
    }

    [Symbol.iterator]() {return this.lyrics[Symbol.iterator]()}

    [Symbol.toStringTag] = "KXLRC";

    [Symbol.toPrimitive](hint: string) {
        if (hint === 'string') return JSON.stringify(this.lyrics, null, 4);
        else return this.lyrics;
    }
};

export { KXLRC };