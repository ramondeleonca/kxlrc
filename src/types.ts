import { z } from "zod";

export const KXLRCParts = <const>["intro", "verse", "refrain", "prechorus", "chorus", "bridge", "outro", "hook"];
export type KXLRCPart = typeof KXLRCParts[number];

export const KXLRCVoices = <const>["PP", "P", "MP", "MF", "F", "FF"];
export type KXLRCVoice = typeof KXLRCVoices[number];

export const KXLRCEdited = z.object({
    timestamp: z.number(),
    user: z.string()
});

export const KXLRCComment = z.object({
    user: z.string(),
    text: z.string(),
});

export const KXLRCTextLineWord = z.object({
    text: z.string(),
    timestamp: z.number().nullable(),
});

export const KXLRCLine = z.object({
    timestamp: z.number({ description: "The timestamp of when the line starts" }).nullable(),

    edited: KXLRCEdited,

    voice: z.string().refine((v) => KXLRCVoices.includes(v as any)).nullable(),

    instrumental: z.boolean(),

    emphasis: z.number().nullable(),

    authors: z.array(z.string()),

    comments: z.array(KXLRCComment).nullable(),

    text: z.array(KXLRCTextLineWord),

    part: z.string().refine((v) => KXLRCParts.includes(v as any)).nullable(),

    verse: z.number().nullable(),

    singers: z.array(z.number()).nullable()
});

export const KXLRCLyrics = z.array(KXLRCLine);