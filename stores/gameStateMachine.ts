import { createContext } from 'react'
import { createMachine, assign, actions, ActorRefFrom } from 'xstate'

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
            actions: [
              actions.log(() => 'ADD_LETTER RECEIVED'),
              'addLetter'
            ]
          }
        }
      }
    },
    context: {
      currentWord: '',
      board: []
    },
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    schema: {
      context: {} as GameData,
      events: {} as
        | { type: 'START_GAME' }
        | { type: 'ADD_LETTER', letter: string }
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
        currentWord: (context, event: { type: 'ADD_LETTER', letter: string }) =>
          context.currentWord + event.letter
      })
    }
  }
)

export const GameStateMachineContext =
  createContext<ActorRefFrom<typeof gameStateMachine>>(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as ActorRefFrom<typeof gameStateMachine>
  )
