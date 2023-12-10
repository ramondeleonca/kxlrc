import { z } from "zod";
export declare const KXLRCParts: readonly ["intro", "verse", "refrain", "prechorus", "chorus", "bridge", "outro", "hook"];
export type KXLRCPart = typeof KXLRCParts[number];
export declare const KXLRCVoices: readonly ["PP", "P", "MP", "MF", "F", "FF"];
export type KXLRCVoice = typeof KXLRCVoices[number];
export declare const KXLRCEdited: z.ZodObject<{
    timestamp: z.ZodNumber;
    user: z.ZodString;
}, "strip", z.ZodTypeAny, {
    timestamp?: number;
    user?: string;
}, {
    timestamp?: number;
    user?: string;
}>;
export declare const KXLRCComment: z.ZodObject<{
    user: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user?: string;
    text?: string;
}, {
    user?: string;
    text?: string;
}>;
export declare const KXLRCTextLineWord: z.ZodObject<{
    text: z.ZodString;
    timestamp: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    text?: string;
    timestamp?: number;
}, {
    text?: string;
    timestamp?: number;
}>;
export declare const KXLRCLine: z.ZodObject<{
    timestamp: z.ZodNullable<z.ZodNumber>;
    edited: z.ZodObject<{
        timestamp: z.ZodNumber;
        user: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp?: number;
        user?: string;
    }, {
        timestamp?: number;
        user?: string;
    }>;
    voice: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    instrumental: z.ZodBoolean;
    emphasis: z.ZodNullable<z.ZodNumber>;
    authors: z.ZodArray<z.ZodString, "many">;
    comments: z.ZodNullable<z.ZodArray<z.ZodObject<{
        user: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        user?: string;
        text?: string;
    }, {
        user?: string;
        text?: string;
    }>, "many">>;
    text: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        timestamp: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        text?: string;
        timestamp?: number;
    }, {
        text?: string;
        timestamp?: number;
    }>, "many">;
    part: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    verse: z.ZodNullable<z.ZodNumber>;
    singers: z.ZodNullable<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export declare const KXLRCLyrics: z.ZodArray<z.ZodObject<{
    timestamp: z.ZodNullable<z.ZodNumber>;
    edited: z.ZodObject<{
        timestamp: z.ZodNumber;
        user: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp?: number;
        user?: string;
    }, {
        timestamp?: number;
        user?: string;
    }>;
    voice: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    instrumental: z.ZodBoolean;
    emphasis: z.ZodNullable<z.ZodNumber>;
    authors: z.ZodArray<z.ZodString, "many">;
    comments: z.ZodNullable<z.ZodArray<z.ZodObject<{
        user: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        user?: string;
        text?: string;
    }, {
        user?: string;
        text?: string;
    }>, "many">>;
    text: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        timestamp: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        text?: string;
        timestamp?: number;
    }, {
        text?: string;
        timestamp?: number;
    }>, "many">;
    part: z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>;
    verse: z.ZodNullable<z.ZodNumber>;
    singers: z.ZodNullable<z.ZodArray<z.ZodNumber, "many">>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>, "many">;
