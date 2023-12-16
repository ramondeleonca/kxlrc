/// <reference types="node" />
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
    lyrics: z.infer<typeof KXLRCLyrics> | null;
    /**
     * Create a new KXLRC instance
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     */
    constructor(lyrics?: z.infer<typeof KXLRCLyrics> | string | Buffer | Uint8Array, packed?: boolean);
    /**
     * Parse the lyrics to a KXLRCLyrics array
     * @param lyrics The lyrics to parse
     * @param packed Whether the lyrics are packed as messagepack or not
     * @returns The parsed lyrics
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * console.log(lyrics);
     */
    static parse(lyrics: z.infer<typeof KXLRCLyrics> | string | Buffer | Uint8Array | any[], packed?: boolean): z.infer<typeof KXLRCLyrics> | null;
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
    add(lyric: z.infer<typeof KXLRCLine>, index?: number, fillTimestamp?: boolean): void;
    /**
     * Add a lyric to the lyrics array (alias for add)
     * @param lyric The lyric to add
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.add({ text: "Hello World!" });
     * console.log(lyrics);
     */
    addLyric: (lyric: z.infer<typeof KXLRCLine>, index?: number, fillTimestamp?: boolean) => void;
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
    static add(lyrics: z.infer<typeof KXLRCLyrics>, lyric: z.infer<typeof KXLRCLine>, index?: number, fillTimestamp?: boolean): void;
    /**
     * Add a lyric to the lyrics array (alias for add)
     * @param lyrics The lyrics to add the lyric to
     * @param lyric The lyric to add
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.add(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    static addLyric: typeof KXLRC.add;
    /**
     * Edit a lyric in the lyrics array
     * @param lyric The lyric to edit
     * @param index The index of the lyric to edit
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.edit({ text: "Hello World!" }, 0);
     * console.log(lyrics);
     */
    edit(lyric: z.infer<typeof KXLRCLine>, index: number): void;
    /**
     * Edit a lyric in the lyrics array (alias for edit)
     * @param lyric The lyric to edit
     * @param index The index of the lyric to edit
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.edit({ text: "Hello World!" }, 0);
     * console.log(lyrics);
     */
    editLyric: (lyric: z.infer<typeof KXLRCLine>, index: number) => void;
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
    static edit(lyrics: z.infer<typeof KXLRCLyrics>, lyric: z.infer<typeof KXLRCLine>, index: number): void;
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
    static editLyric: typeof KXLRC.edit;
    /**
     * Remove a lyric from the lyrics array
     * @param lyric The lyric to remove
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.remove({ text: "Hello World!" });
     * console.log(lyrics);
     */
    remove(lyric: z.infer<typeof KXLRCLine> | number): void;
    /**
     * Remove a lyric from the lyrics array (alias for remove)
     * @param lyric The lyric to remove
     * @example
     * const lyrics = new KXLRC(fs.readFileSync("lyrics.kxlrc"));
     * lyrics.remove({ text: "Hello World!" });
     * console.log(lyrics);
     */
    removeLyric: (lyric: z.infer<typeof KXLRCLine> | number) => void;
    /**
     * Remove a lyric from the lyrics array
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    static remove(lyrics: z.infer<typeof KXLRCLyrics>, lyric: z.infer<typeof KXLRCLine> | number): {
        timestamp?: number;
        edited?: {
            timestamp?: number;
            user?: string;
        };
        voice?: string;
        instrumental?: boolean;
        emphasis?: number;
        authors?: string[];
        comments?: {
            user?: string;
            text?: string;
        }[];
        text?: {
            text?: string;
            timestamp?: number;
        }[];
        part?: string;
        verse?: number;
        singers?: number[];
    }[];
    /**
     * Remove a lyric from the lyrics array (alias for remove)
     * @param lyrics The lyrics to remove the lyric from
     * @param lyric The lyric to remove
     * @example
     * const lyrics = KXLRC.parse(fs.readFileSync("lyrics.kxlrc"));
     * KXLRC.remove(lyrics, { text: "Hello World!" });
     * console.log(lyrics);
     */
    static removeLyric: typeof KXLRC.remove;
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
    getLyric(time: number, lyrics?: {
        timestamp?: number;
        edited?: {
            timestamp?: number;
            user?: string;
        };
        voice?: string;
        instrumental?: boolean;
        emphasis?: number;
        authors?: string[];
        comments?: {
            user?: string;
            text?: string;
        }[];
        text?: {
            text?: string;
            timestamp?: number;
        }[];
        part?: string;
        verse?: number;
        singers?: number[];
    }[]): z.infer<typeof KXLRCLine> | null;
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
    static getLyric(lyrics: z.infer<typeof KXLRCLyrics>, time: number): z.infer<typeof KXLRCLine> | null;
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
    pack(): Buffer;
    /**
     * Stringify the lyrics array
     * @returns The stringified lyrics
     */
    toString(): string;
    /**
     * Stringify the lyrics array
     * @param lyrics The lyrics to stringify
     * @returns The stringified lyrics
     */
    static stringify(lyrics: z.infer<typeof KXLRCLyrics>): string;
    [Symbol.iterator](): IterableIterator<{
        timestamp?: number;
        edited?: {
            timestamp?: number;
            user?: string;
        };
        voice?: string;
        instrumental?: boolean;
        emphasis?: number;
        authors?: string[];
        comments?: {
            user?: string;
            text?: string;
        }[];
        text?: {
            text?: string;
            timestamp?: number;
        }[];
        part?: string;
        verse?: number;
        singers?: number[];
    }>;
    [Symbol.toStringTag]: string;
    [Symbol.toPrimitive](hint: string): string | {
        timestamp?: number;
        edited?: {
            timestamp?: number;
            user?: string;
        };
        voice?: string;
        instrumental?: boolean;
        emphasis?: number;
        authors?: string[];
        comments?: {
            user?: string;
            text?: string;
        }[];
        text?: {
            text?: string;
            timestamp?: number;
        }[];
        part?: string;
        verse?: number;
        singers?: number[];
    }[];
}
export { KXLRC };
