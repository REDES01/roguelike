# LLM gen roguelike game

Generate a simple roguelike game with OpenAI API.

## Features
- Create Maps using OpenAI API's structural output
- Explore the map to fight monsters to get items and get stronger
- Simple battle logs

## Quick Start
### Run The Frontend
```bash
# prerequisites: <uv/python/node.js/vite/openai>
git clone https://github.com/REDES01/roguelike
cd roguelike
cd frontend
cd frontend
npm run dev

# go to http://localhost:5173/
```

# Create Your Own Map
## Edit the prompt
### "Create a 2d 3x3 adventure map with the user's theme."
you can create a bigger map, but you might need to change css
### {"role":"user", "content":"pirate"}
content-> the theme of the game
### "The maps should have 3 levels, start at 0"
you can change how many  levels there are here
### "Try to make the game both not too challenging but not way too easy."
modify this line to make the game easiler or harder

## Generate Map
```bash
# from repo root
uv python install 3.12        # installs Python if needed
uv sync                       # installs deps from pyproject/uv.lock

uv run python main.py
```

## View Json
All the info of the map is in template.json and you can directly modify it
