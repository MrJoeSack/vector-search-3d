#!/bin/bash

# This script creates a demo GIF of the vector search visualization
# It uses screencapture to take screenshots and convert them to a GIF

echo "Creating demo screenshots..."

# Create a temporary directory for screenshots
mkdir -p demo-screenshots

# Open the visualization in the default browser
open http://localhost:5173

# Wait for page to load
echo "Waiting for page to load..."
sleep 5

# Take a series of screenshots
echo "Taking screenshots..."
for i in {1..20}; do
    screencapture -x -t png demo-screenshots/frame_$i.png
    sleep 0.5
done

echo "Converting to GIF..."
# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    convert -delay 50 -loop 0 demo-screenshots/*.png demo.gif
    echo "Demo GIF created: demo.gif"
else
    echo "ImageMagick not found. Install with: brew install imagemagick"
    echo "Screenshots saved in demo-screenshots/"
fi

# Clean up
# rm -rf demo-screenshots