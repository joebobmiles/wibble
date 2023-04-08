import { FC } from 'react'
import { useMachine } from '@xstate/react'

import Tile from '@/components/Tile'
import gameStateMachine from '@/stores/gameStateMachine'

import styles from './index.module.scss'

const App: FC = () => {
  const [
    state,
    send
  ] = useMachine(gameStateMachine)

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
          ? (
            <button onClick={() => send('START_GAME')}>
              Play
            </button>
            )
          : null
      }
    </main>
  )
}

export default App
