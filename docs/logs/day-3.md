- Plan for today is to implement the chaining state.
    - When we move to the “play” state, we immediately transition to an “idle” state.
        - While idling, we wait for the player to click on a tile.
            - Once this happens, we transition to the “chaining” state.
        - While chaining, each tile listens for the cursor to enter the tile.
            - If the tile is *not* selected, it becomes selected and is added to the current chain.
            - If the tile *is* selected, it checks if it is the second-to-last letter in the chain and requests the last letter to be removed from the chain.
            - We remain in the chaining state until the user releases the mouse.
                - Once the user releases the cursor, we transition back to the “idle” state.
                    - At first I made the mistake of putting the pointer up listener on the tiles. This meant that that you would only return to the idle state if the mouse cursor was released while on top of a tile. This isn’t intuitive, so instead I added the pointer up listener to the grid itself.
                    - To make this even more bullet proof, we could attach a listener to the window.
                - However, on exit from the “chaining” state, we check how many tiles have been selected.
                    - If only one tile has been selected, do nothing.
                    - If more than one tile has been selected, compute the score of the word.
                        - In the future there will be more happening here, such as verifying that we have in fact gotten a valid English word.
    - When a token has been selected, we want it to change to show the player what letters they’ve selected so far.
        - This means the token needs its own internal state.
            - This is a simple binary state, so we’ll just use the `useState` hook to track a boolean between renders.
                - When we click the mouse down, or move the mouse over the tile, we send the add letter event and then mark the tile as selected.
                - When we leave the chaining state, we have to de-select all the tiles.
- To compute the score, we need to provide the point values of each letter in the current word.
    - We don’t do this due to being lazy.
    - A simple solution to computing the score is to just track it while we’re building the word.
        - Yay being lazy.
- Once we leave “chaining” mode, we need to clean up before transitioning back to the “idle” state.
    - What we need to do is take the current score and add it to a total score, then reset the current score and current word back to being zero and empty, respectively.
- Now for the most complicated bit: backtracking
    - Our laziness has made this require a refactor.
        - We need to store a “current chain” instead of a current word, which helps us track which tiles were selected and in what order.
            - To identify each tile (since tiles can have identical letters and scores), we need an ID.
                - We’ll use the X,Y pair. This will be useful later when we implement drawing a path between tiles.
            - Additionally, we need to pass the letter and score for that tile.
            - We can simplify everything by passing the (X,Y) pair and then referencing the board, which is stored in the state machine’s context, to get the letter and score.
                - This means that we need to pass the X,Y pair to the tiles now so that they can provide the state machine the information it needs.
    - Now that we store the chain of tiles, we can check if the current tile is the second to last tile.
        - This only happens when the mouse enters a tile that is selected during the chaining state.
- A fix to round out the day: chains of only one letter should not be counted.
    - My temptation is to check this when we exit the chaining state.
    - However, that would mean that the chaining cleanup is responsible for three things:
        1. Clearing the current chain, word, and score.
        2. Adding the current word score to the total score.
        3. Validating if a chain is the correct length to be counted.
    - On top of those responsibilities, the chaining state itself is also responsible for:
        - Adding to the chain
        - Removing from the chain
        - Updating the current word
        - Updating the score
        - Transitioning to the idle state when the user releases the mouse button
    - There’s too much going on for *one* state to handle, so we’ll break it into three states:
        1. The chaining state. This version will be responsible *only* for adding and removing to the chain, as well as updating the current word and score counts when the chain is modified.
            - This state will additionally have a conditional transition: if the chain is only one letter (or less) long, then we’ll skip the the idle state. Otherwise, we move to the score state.
        2. The score state. This state will update the total score and then transition to the idle state.
        3. The idle state. Like the previous idle state, but every time we enter this state, we clear the current chain, word, and letter.