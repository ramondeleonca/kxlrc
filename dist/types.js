"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KXLRCLyrics = exports.KXLRCLine = exports.KXLRCTextLineWord = exports.KXLRCComment = exports.KXLRCEdited = exports.KXLRCVoices = exports.KXLRCParts = void 0;
var zod_1 = require("zod");
exports.KXLRCParts = ["intro", "verse", "refrain", "prechorus", "chorus", "bridge", "outro", "hook"];
exports.KXLRCVoices = ["PP", "P", "MP", "MF", "F", "FF"];
exports.KXLRCEdited = zod_1.z.object({
    timestamp: zod_1.z.number(),
    user: zod_1.z.string()
});
exports.KXLRCComment = zod_1.z.object({
    user: zod_1.z.string(),
    text: zod_1.z.string(),
});
exports.KXLRCTextLineWord = zod_1.z.object({
    text: zod_1.z.string(),
    timestamp: zod_1.z.number().nullable(),
});
exports.KXLRCLine = zod_1.z.object({
    timestamp: zod_1.z.number({ description: "The timestamp of when the line starts" }).nullable(),
    edited: exports.KXLRCEdited,
    voice: zod_1.z.string().refine(function (v) { return exports.KXLRCVoices.includes(v); }).nullable(),
    instrumental: zod_1.z.boolean(),
    emphasis: zod_1.z.number().nullable(),
    authors: zod_1.z.array(zod_1.z.string()),
    comments: zod_1.z.array(exports.KXLRCComment).nullable(),
    text: zod_1.z.array(exports.KXLRCTextLineWord),
    part: zod_1.z.string().refine(function (v) { return exports.KXLRCParts.includes(v); }).nullable(),
    verse: zod_1.z.number().nullable(),
    singers: zod_1.z.array(zod_1.z.number()).nullable()
});
exports.KXLRCLyrics = zod_1.z.array(exports.KXLRCLine);
//# sourceMappingURL=types.js.map