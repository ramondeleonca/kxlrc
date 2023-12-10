"""
Plays the audio file along with the lyrics file
"""

import json
import pygame
import os
import time
import colorama as c
from typing import Any

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')

def kxlrc_text_to_str(text):
    result = ""
    for text_description in text:
        result += text_description["text"] + " "
    return result.strip()

def find_closest_timestamp(data_array, target_time):
    left, right = 0, len(data_array) - 1

    while left <= right:
        mid = (left + right) // 2
        mid_time = data_array[mid]["timestamp"]

        if mid_time == target_time:
            return data_array[mid]
        elif mid_time < target_time:
            left = mid + 1
        else:
            right = mid - 1

    # If no exact match is found, return the closest timestamp (less than or equal to the target)
    if right < 0:
        # If the target is smaller than the smallest timestamp in the array
        return None
    else:
        return data_array[right]

c.init(autoreset=True)

pygame.init()
pygame.mixer.init()

lyrics_file_path = input("Enter lyrics file path: ")
song_file_path = input("Enter song file path: ")

pygame.mixer.music.load(song_file_path)

with open(lyrics_file_path, "r") as f:
    lyrics: list[dict[str, Any]] = json.load(f)

print("Starting in 3...")
time.sleep(1)
print("Starting in 2...")
time.sleep(1)
print("Starting in 1...")
time.sleep(1)

pygame.mixer.music.play()
pygame.mixer.music.set_pos(0)

# Clear the terminal
clear_terminal()

past_lyric_index = None
while pygame.mixer.music.get_busy():
    # Get the current time
    current_time = pygame.mixer.music.get_pos()
    
    current_lyrics = find_closest_timestamp(lyrics, current_time)
    
    if current_lyrics is not None:
        # Clear the terminal
        clear_terminal()
        
        # Print the current lyrics
        print(kxlrc_text_to_str(current_lyrics['text']))

    # Wait a little while to not overload the CPU
    time.sleep(0.1)

pygame.mixer.music.fadeout(1)
pygame.mixer.music.stop()
pygame.mixer.music.unload()
pygame.quit()