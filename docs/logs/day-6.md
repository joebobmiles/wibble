- Working on implementing the redesign I made in Figma.
  - First things first is we need two views: the title and the board.
    - This is really the title screen and the game.
    - What I'm going to do is refactor to have the following components:
      1. `<Wibble />`: The Wibble component will be the top-level component for
         the game itself.
        - It will page between the Title component and Game component depending
          on the higher state.
      2. `<Title />`: The Title component will handle the title screen.
      3. `<Game />`: The Game component will handle the actual game.
    - With this new structure, we may be able to simplify the state machine to
      only handle the game and not need to manage the transition from title to
      game.
      - Could this be a trap?
        - What if we wanted to transition _back_ to the title screen from the
          game? We'd have to implement a whole new system to manage that
          transition, which we could have just done using XState.
  - Now that we have two views, we need to start implementing the styles
    - 