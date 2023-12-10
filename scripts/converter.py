"""
Converts a text file to a KXLRC lyric array
"""

import json
import os

result = []

# Ask for file path and read it 
file_path = input("Enter file path: ")
with open(file_path, "r") as f:
    data = f.read()

# for each line, apply the correct format
data = data.split("\n")

for line in data:
    if len(line) > 0:
        line = line.split(" ")
        result.append({
            "timestamp": None,
            "edited": { "timestamp": 1700352778771, "user": "00000000000000000000" },
            "voice": "MF",
            "instrumental": False,
            "emphasis": 1,
            "authors": ["00000000000000000000"],
            "comments": [{ "user": "00000000000000000000", "text": "" }],
            "text": [{"text": word, "timestamp": None } for word in line],
            "part": "chorus",
            "verse": None,
            "singers": [0]
        })

# Write the result to a file
print("Saving to a new file...")
filename = input("Enter filename: ")
while not filename:
    if input("Override? (y/n): ") == "y":
        filename = "convert_result"
    else:
        filename = input("Enter filename: ")
with open(os.path.join(os.path.dirname(os.path.realpath(__file__)), filename + ".json"), "w") as f:
    json.dump(result, f, indent=4)