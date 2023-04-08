import { FC } from 'react'
import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

import { generateTitleBoard, generateRandomBoard } from '@/utils/board'
import { TileData } from '@/types'

import Tile from '@/components/Tile'

import styles from './index.module.scss'

interface GameData {
  board: TileData[][]
  currentWord: string
}

const machine = createMachine(
  {
    initial: 'title',
    states: {
      title: {
        entry: 'setupTitle',
        on: {
          START_GAME: {
            target: 'play'
          }
        }
      },
      play: {
        entry: 'setupGame'
      }
    },
    context: {
      currentWord: '',
      board: []
    },
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    schema: {
      context: {} as GameData
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
      })
    }
  }
)

const App: FC = () => {
  const [
    state,
    send
  ] = useMachine(machine)

  return (
    <main className={styles.container}>
      <div>{state.context.currentWord}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          border: '1px solid black',
          padding: '16px',

          position: 'relative'
        }}
      >
        {
          state.context.board.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px'
              }}
            >
              {
                row.map((data, colIndex) => (
                  <Tile
                    key={colIndex}
                    {...data}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
      {
        state.matches('title')
          ? <button onClick={() => send('START_GAME')}>Play</button>
          : null
      }
    </main>
  )
}

export default App
