import { FC } from 'react'
import { createMachine } from 'xstate'

import { generateTitleBoard } from '@/utils/board'
import { TileData } from '@/types'

import Tile from '@/components/Tile'

import styles from './index.module.scss'
import { useMachine } from '@xstate/react'

interface GameData {
  board: TileData[][]
  currentWord: string
}

const machine = createMachine(
  {
    initial: 'setup',
    states: {
      setup: {}
    },
    context: {
      currentWord: 'WIBLE',
      board: generateTitleBoard()
    },
    /* eslint-disable @typescript-eslint/consistent-type-assertions */
    schema: {
      context: {} as GameData
    }
    /* eslint-enable @typescript-eslint/consistent-type-assertions */
  }
)

const App: FC = () => {
  const [{ context: { currentWord, board } }] = useMachine(machine)

  return (
    <main className={styles.container}>
      <div>{currentWord}</div>
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
          board.map((row, rowIndex) => (
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
    </main>
  )
}

export default App
