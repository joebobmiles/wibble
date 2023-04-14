import { createContext } from 'react'
import { createMachine, assign, ActorRefFrom } from 'xstate'

import { generateTitleBoard, generateRandomBoard, randomLetter } from '@/utils/board'
import { GameData } from '@/types'

const addLetterActions = [
  'addLetter',
  'updateCurrentWord'
]

export const gameStateMachine = createMachine(
  {
    initial: 'title',
    states: {
      title: {
        entry: 'setupTitle',
        on: {
          START_GAME: 'play'
        }
      },
      play: {
        entry: 'setupGame',
        initial: 'idle',
        states: {
          idle: {
            entry: 'clearCurrentWord',
            on: {
              ADD_LETTER: {
                target: 'chaining',
                actions: addLetterActions
              }
            }
          },
          chaining: {
            on: {
              ADD_LETTER: {
                actions: addLetterActions
              },
              REMOVE_LETTER: {
                actions: [
                  'removeLetter',
                  'updateCurrentWord'
                ]
              },
              STOP_CHAINING: [
                { target: 'cleanup', cond: 'chainMeetsMinimumLength' },
                { target: 'idle' }
              ]
            }
          },
          cleanup: {
            always: {
              target: 'idle',
              actions: [
                'updateTotalScore',
                'replaceUsedLetters'
              ]
            }
          }
        }
      }
    },
    context: {
      currentChain: [],
      currentWord: '',
      currentScore: 0,
      totalScore: 0,
      board: []
    },
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    schema: {
      context: {} as GameData,
      events: {} as
        | { type: 'START_GAME' }
        | { type: 'ADD_LETTER', location: [number, number] }
        | { type: 'REMOVE_LETTER' }
        | { type: 'STOP_CHAINING' }
    }
    /* eslint-enable @typescript-eslint/consistent-type-assertions */
  },
  {
    actions: {
      setupTitle: assign({
        currentWord: (_) => '',
        board: (_) => generateTitleBoard()
      }),
      setupGame: assign({
        board: (_) => generateRandomBoard()
      }),
      addLetter: assign({
        currentChain: (context, { location }: { type: 'ADD_LETTER', location: [number, number] }) =>
          context.currentChain.concat([location])
      }),
      removeLetter: assign({
        currentChain: (context) =>
          context.currentChain.slice(0, -1)
      }),
      updateCurrentWord: assign({
        currentWord: (context) => context.currentChain.reduce(
          (word, [col, row]) => word + context.board[row][col].letter,
          ''
        ),
        currentScore: (context) => context.currentChain.reduce(
          (score, [col, row]) => score + context.board[row][col].score,
          0
        )
      }),
      updateTotalScore: assign({
        totalScore: (context) => context.totalScore + context.currentScore
      }),
      replaceUsedLetters: assign({
        board: (context) => {
          const board = context.board

          for (const [col, row] of context.currentChain) {
            board[row][col] = randomLetter()
          }

          return board
        }
      }),
      clearCurrentWord: assign({
        currentChain: [],
        currentWord: '',
        currentScore: 0
      })
    },
    guards: {
      chainMeetsMinimumLength: (context) => context.currentChain.length > 1
    }
  }
)

export const GameStateMachineContext =
  createContext<ActorRefFrom<typeof gameStateMachine>>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as ActorRefFrom<typeof gameStateMachine>
  )
