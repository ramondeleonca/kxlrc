"""
CLI Tool for timestamping lyrics in a KXLRC array format
"""

import json
import os
import keyboard
import colorama as c
import time
import pygame
import threading
from typing import Any

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')

def kxlrc_text_to_str(text):
    result = ""
    for text_description in text:
        result += text_description["text"] + " "
    return result.strip()

c.init(autoreset=True)

pygame.init()
pygame.mixer.init()

lyrics_file_path = input("Enter lyrics file path: ")
song_file_path = input("Enter song file path: ")

pygame.mixer.music.load(song_file_path)

with open(lyrics_file_path, "r") as f:
    lyrics: list[dict[str, Any]] = json.load(f)

print("1: Timestamp lines (Timestamp when a line is sung)")
print("2: Timestamp words (Timestamp when a word is sung)")
print("3: Timestamp lines and words (Timestamp when a word is sung but also update the line timestamp when the past one ended) (not recommended, DO NOT USE!)")
option = input("Enter option: ")

print("Starting in 3...")
time.sleep(1)
print("Starting in 2...")
time.sleep(1)
print("Starting in 1...")
time.sleep(1)

pygame.mixer.music.play()
pygame.mixer.music.set_pos(0)

# Fade song in
threading.Thread(target=lambda: (pygame.mixer.music.set_volume(i / 100) and time.sleep(0.01) for i in range(100))).start()

result = []
clear_terminal()
if option == "1":
    for i in range(len(lyrics)):
        # Instruction
        print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "Press enter when the line is sung...\n\n")
        
        # Print past lyrics
        if i > 0:
            print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i - 1]["text"]))
        else:
            print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "...")

        # Print current lyrics
        print(c.Back.RESET + c.Fore.RESET + c.Back.WHITE + c.Fore.BLACK + kxlrc_text_to_str(lyrics[i]["text"]))

        # Print future lyrics
        if i < len(lyrics) - 1:
            print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i + 1]["text"]))
        else:
            print(c.Back.RESET + c.Fore.RESET + c.Back.RESET + c.Fore.RESET + "End")
        
        # Wait for user input
        keyboard.wait("enter", suppress=True)
        
        # Song timestamp
        timestamp = pygame.mixer.music.get_pos()
        
        # Update the properties of the resulting lyrics
        lyrics[i].update({
            "timestamp": timestamp,
            "edited": {"timestamp": int(time.time() * 1000), "user": "00000000000000000000"}
        })
        
        # Add to result
        result.append(lyrics[i])
        
        # Clear the terminal
        clear_terminal()
elif option == "2":
    # For each lyric entry in the file...
    for i in range(len(lyrics)):
        # Current word stores the index of the current word being timestamped
        current_word = 0
        
        # Repeat this for each word that has to be timestamped
        for word_i in range(len(lyrics[i]["text"])):
            # Print the Instruction
            print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "Press enter when the word is sung...\n\n")
            
            # Print past lyrics
            if i > 0:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i - 1]["text"]))
            else:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "...")
        
            # This will print the entire lyrics line (word per word) and highlight the current word (if word index matches current word index)
            for [word_i, word] in enumerate(lyrics[i]["text"]):
                print(c.Back.RESET + c.Fore.RESET + (c.Back.WHITE + c.Fore.BLACK if word_i == current_word else c.Back.BLACK + c.Fore.WHITE) + word["text"], end=" ")
            
            # Add an extra line for the next lyrics
            print()
            
            # Print future lyrics
            if i < len(lyrics) - 1:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i + 1]["text"]))
            else:
                print(c.Back.RESET + c.Fore.RESET + c.Back.RESET + c.Fore.RESET + "End")
            
            # wait for enter
            keyboard.wait("enter", suppress=True)
            
            # Get the timestamp from pygame
            timestamp = pygame.mixer.music.get_pos()
            
            # Update the object
            words = []
            for [word_i, word] in enumerate(lyrics[i]["text"]):
                if word_i == current_word:
                    word.update({"timestamp": timestamp})
                words.append(word)
            lyrics[i].update({"text": words})
            
            # Clear the terminal
            clear_terminal()
            
            # Increment the current word index
            current_word += 1

        # Add to result
        result.append(lyrics[i])
elif option == "3":
    # For each lyric entry in the file...
    for i in range(len(lyrics)):
        # Current word stores the index of the current word being timestamped
        current_word = 0
        
        # Repeat this for each word that has to be timestamped
        for word_i in range(len(lyrics[i]["text"])):
            # Print the Instruction
            print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "Press enter when the word is sung...\n\n")
            
            # Print past lyrics
            if i > 0:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i - 1]["text"]))
            else:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + "...")
        
            # This will print the entire lyrics line (word per word) and highlight the current word (if word index matches current word index)
            for [word_i, word] in enumerate(lyrics[i]["text"]):
                print(c.Back.RESET + c.Fore.RESET + (c.Back.WHITE + c.Fore.BLACK if word_i == current_word else c.Back.BLACK + c.Fore.WHITE) + word["text"], end=" ")
            
            # Add an extra line for the next lyrics
            print()
            
            # Print future lyrics
            if i < len(lyrics) - 1:
                print(c.Back.RESET + c.Fore.RESET + c.Fore.LIGHTBLACK_EX + kxlrc_text_to_str(lyrics[i + 1]["text"]))
            else:
                print(c.Back.RESET + c.Fore.RESET + c.Back.RESET + c.Fore.RESET + "End")
            
            # wait for enter
            keyboard.wait("enter", suppress=True)
            
            # Get the timestamp from pygame
            timestamp = pygame.mixer.music.get_pos()
            
            # If it's the first lyric update the lines' timestamps
            if current_word == 0:
                lyrics[i].update({
                    "timestamp": timestamp,
                    "edited": {"timestamp": int(time.time() * 1000), "user": "00000000000000000000"}
                })
            
            # Update the object
            words = []
            for [word_i, word] in enumerate(lyrics[i]["text"]):
                if word_i == current_word:
                    word.update({"timestamp": timestamp})
                words.append(word)
            lyrics[i].update({"text": words})
            
            # Clear the terminal
            clear_terminal()
            
            # Increment the current word index
            current_word += 1

        # Add to result
        result.append(lyrics[i])
else:
    print("Invalid option!")
    exit()

pygame.mixer.music.fadeout(1)

while pygame.mixer.music.get_busy():
    pass

pygame.mixer.music.stop()
pygame.mixer.music.unload()
pygame.quit()

print(json.dumps(result, indent=4))

print("Done! Writing to file...")

print("1: Overwrite")
print("2: Save to new file")
option = input("Enter option: ")

if option == "1":
    with open(lyrics_file_path, "w") as f:
        json.dump(result, f, indent=4)
else:
    print("Saving to a new file...")
    filename = input("Enter filename: ")
    while not filename:
        if input("Override? (y/n): ") == "y":
            filename = "convert_result"
        else:
            filename = input("Enter filename: ")
    with open(os.path.join(os.path.dirname(os.path.realpath(__file__)), filename + ".json"), "w") as f:
        json.dump(result, f, indent=4)