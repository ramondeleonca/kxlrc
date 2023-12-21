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
    timestamp: z.number().optional().nullable(),
});

export const KXLRCLine = z.object({
    timestamp: z.number({ description: "The timestamp of when the line starts" }).optional().nullable(),

    edited: KXLRCEdited.optional().nullable(),

    voice: z.string().refine((v) => KXLRCVoices.includes(v as any)).optional().nullable().default("MF"),

    instrumental: z.boolean().default(false),

    emphasis: z.number().optional().nullable().default(0),

    authors: z.array(z.string()).optional().nullable().default([]),

    comments: z.array(KXLRCComment).optional().nullable().default([]),

    text: z.array(KXLRCTextLineWord).optional().nullable(),

    part: z.string().refine((v) => KXLRCParts.includes(v as any)).optional().nullable(),

    verse: z.number().optional().nullable(),

    singers: z.array(z.number()).optional().nullable().default([0])
});

export const KXLRCLyrics = z.array(KXLRCLine);