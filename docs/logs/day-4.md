- Goals for today:
  - We have a few options
    1. Setup replacing tiles after they are used in a word.
    2. Generate boards more intelligently than pure randomness.
    3. Style the game to more closely match the mock-up in Figma.
    4. Add word validation.
- To start, I'm going to setup replacing used tiles.
  - Since we already know which tiles were used, all we need to do is, during
    the cleanup phase after chaining, we replace each used tile in the board
    with a random tile selected from the set of tiles we store.