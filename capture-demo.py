#!/usr/bin/env python3
import os
import time
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import cv2
import numpy as np
from PIL import Image
import imageio

# Set up Chrome options for headless mode with larger window
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920,1080")
chrome_options.add_argument("--force-device-scale-factor=2")  # For retina quality
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

print("Starting browser...")
driver = webdriver.Chrome(options=chrome_options)
driver.set_window_size(1920, 1080)

frames = []

def capture_frame():
    screenshot = driver.get_screenshot_as_png()
    img = Image.open(io.BytesIO(screenshot))
    frames.append(np.array(img))

try:
    print("Loading visualization...")
    driver.get("http://localhost:5173")
    time.sleep(5)  # Wait for page to load
    
    # Get the canvas element
    canvas = driver.find_element(By.TAG_NAME, "canvas")
    actions = ActionChains(driver)
    
    print("Recording demo...")
    
    # Initial view
    for _ in range(30):  # 1 second at 30fps
        capture_frame()
    
    # Rotate the view
    print("Rotating view...")
    actions.move_to_element(canvas).click_and_hold().move_by_offset(200, 0).release().perform()
    time.sleep(0.5)
    for _ in range(30):
        capture_frame()
    
    # Rotate more
    actions.move_to_element(canvas).click_and_hold().move_by_offset(-300, 100).release().perform()
    time.sleep(0.5)
    for _ in range(30):
        capture_frame()
    
    # Hover over points
    print("Hovering over configuration points...")
    # This would require finding the exact positions of the 3D points
    # For now, let's just capture the static view
    
    for _ in range(60):  # 2 more seconds
        capture_frame()
    
    print(f"Captured {len(frames)} frames")
    
finally:
    driver.quit()

# Create video from frames
print("Creating video...")
if frames:
    imageio.mimsave('demo.mp4', frames, fps=30)
    print("Video saved as demo.mp4")
else:
    print("No frames captured")