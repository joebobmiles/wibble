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
    - Replaced the "score" state with a "cleanup" state that handles post-
      chaining activities such as updating the total score and replacing used
      tiles.
    - Added a utility function for grabbing a single random letter from our list
      of tile data.
      - This can be modified to not return purely random tiles, but have a
        weighted distribution.
- Since we set ourselves up so nicely for it, let's start generating boards more
  intelligently than with just pure randomness.
  - A pure random board as an issue in that all letters are equally likely to
    appear, but English doesn't have an equal distribution of letters in its
    words.
  - Some letters appear more frequently than others
    - Frequency is why the letters in Scrabble are scored the way they are. Less
      frequent, and subsequently more rare, letters have a larger point value
      because they are simply fewer words they are part of.
  - Because the scores are based on frequency, we can devise a distribution
    based on point value, where high value tiles are less frequent to appear than
    low point value tiles.
    - https://stackoverflow.com/questions/4463561/weighted-random-selection-from-array
      - This StackOverflow gives a very direct answer without actually providing
        any code, perfect for me who is trying to grow as much as possible through
        this project.
      - The suggestion is to compute a discrete cumulative distribution function
        (CDF).
        - [Wikipedia says](https://en.wikipedia.org/wiki/Cumulative_density_function)
          that CDF is a contradictory term that results in "confusion between
          probability density function and cumulative distribution function."
        - Checking both the pages for those two terms leads me to believe that
          the answer is referring to [cumulative distribution functions](https://en.wikipedia.org/wiki/Cumulative_distribution_function).
      - Wikipedia isn't much help in trying to understand CDF, due to the use of
        statistics knowledge/language that I just haven't developed or simply
        forgot in the intervening time since my last stats class.
        - [Statology](https://www.statology.org/cdf-vs-pdf/) describes CDFs, and
          probability density functions (PDFs), in a way that is much easier to
          understand.
        - To explain here:
          - Image we had a six-sided dice. If it is a fair die, then each side
            will have an equal opportunity of appearing.
          - The probability density function takes the value of a side as an
            input and outputs the probability that value would be the result of
            a die roll.
              - Example: P(1) = 1/6, P(2) = 1/6, P(3) = 1/6, etc...
          - The cumulative distribution function is the integral of the PDF,
            that is, for a given value, it _sums_ the probability of that value
            appearing with all previous values.
              - Example: P(1) = 1/6, P(2) = 2/6, P(3) = 3/6, etc...
      - What we can use the CDF for is to construct a table to values and their
        cumulative probability, normalize those probabilities so that they are
        between zero and one, and then conduct a binary search for a random
        number generated between the same range.
        - Unlike a more traditional binary search, where we would look for the
          _exact_ input value, this search would instead use each probability
          value as the ends of an interval.
          - Example:
            - We generate a CDF table for our fair dice, which looks like: 
              ```
              [
                1 = 0.16,
                2 = 0.33,
                3 = 0.5,
                4 = 0.66,
                5 = 0.83,
                6 = 1.0
              ]
              ```
            - Next, we pull a random value of 0.21.
            - To conduct the binary search, we grab the middle interval, which
              is `(0.5, 0.66]`.
              - Our value is _less_ than the lower boundary of the interval, so
                we have to jump down to the interval between the lowest and the
                middle interval.
            - This middle interval is `(0.33, 0.5]`.
              - Our value of 0.21 is _still_ lower than the lower boundary of
                the interval, so we go down again to the last interval.
            - This last interval is `(0.16, 0.33]`, in which our value fits.
            - This interval is created using the cumulative probabilities of
              the values of 1 and 2, so which do we return as the result?
              - Well, we have to keep in mind that if we use the values in our
                array, we can only construct _five_ intervals for _six_ values.
                - Our five intervals are: `(0.16, 0.33]`, `(0.33, 0.5]`,
                  `(0.5, 0.66]`, `(0.66, 0.83]`, `(0.83, 1.0]`.
                - Since our random values can be less than 0.16, we can create
                  our sixth interval: `[0, 0.16]`.
                - Each interval can be mapped to the value whose probability is
                  the same as their upper bound.
            - We return the result as 2, since the upper bound is 0.33.
      - So how the hell do we get the probabilities?
        - Originally I planned to just use the point values of the letters to
          generate their probabilities of appearing, but what would make more
          sense is to just use the relative frequencies of the letters to begin
          with since [they are well known](https://en.wikipedia.org/wiki/Letter_frequency).
          - The table in this Wikipedia article is our probability density function.
        - Now that we have the PDF, we can create the CDF.
          - I used a spreadsheet to create the CDF since it wouldn't need to be
            updated during runtime.
      - Implementing the binary search is a perfect opportunity to start adding
        tests to this code.
