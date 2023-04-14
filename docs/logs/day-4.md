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
  - But we don't have a cleanup phase...
    - The closest we get is the `cleanupChain` call whenever we enter the "idle"
      state. This is supposed to clear out all chaining related data and isn't
      exactly intended to manipulate board state, since "idle" is also the first
      state we enter after transitioning from "title" to "play."
  - We could create a distinct "cleanup" state where all the post-chaining
    cleanup occurs, making the "idle" state truly idle.