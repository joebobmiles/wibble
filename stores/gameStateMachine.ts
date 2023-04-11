import { createContext } from 'react'
import { createMachine, assign, ActorRefFrom } from 'xstate'

import { generateTitleBoard, generateRandomBoard } from '@/utils/board'
import { GameData } from '@/types'

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
        on: {
          ADD_LETTER: {
            actions: 'addLetter'
          }
        },
        initial: 'idle',
        states: {
          idle: {
            on: {
              ADD_LETTER: {
                target: 'chaining',
                actions: 'addLetter'
              }
            }
          },
          chaining: {
            on: {
              QUIT_CHAINING: 'idle'
            },
            exit: 'chainingCleanup'
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
        | { type: 'QUIT_CHAINING' }
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
          context.currentChain.concat([location]),
        currentWord: (context, { location: [col, row] }: { type: 'ADD_LETTER', location: [number, number] }) =>
          context.currentWord + context.board[row][col].letter,
        currentScore: (context, { location: [col, row] }: { type: 'ADD_LETTER', location: [number, number] }) =>
          context.currentScore + context.board[row][col].score
      }),
      chainingCleanup: assign({
        currentChain: [],
        currentWord: '',
        currentScore: 0,
        totalScore: (context) => context.totalScore + context.currentScore
      })
    }
  }
)

export const GameStateMachineContext =
  createContext<ActorRefFrom<typeof gameStateMachine>>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as ActorRefFrom<typeof gameStateMachine>
  )
