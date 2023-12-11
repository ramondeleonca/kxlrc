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
    timestamp: z.number().optional(),
});

export const KXLRCLine = z.object({
    timestamp: z.number({ description: "The timestamp of when the line starts" }).optional(),

    edited: KXLRCEdited.optional(),

    voice: z.string().refine((v) => KXLRCVoices.includes(v as any)).optional(),

    instrumental: z.boolean().default(false),

    emphasis: z.number().optional().default(0),

    authors: z.array(z.string()),

    comments: z.array(KXLRCComment).optional(),

    text: z.array(KXLRCTextLineWord).optional(),

    part: z.string().refine((v) => KXLRCParts.includes(v as any)).optional(),

    verse: z.number().optional(),

    singers: z.array(z.number()).optional().default([0])
});

export const KXLRCLyrics = z.array(KXLRCLine);