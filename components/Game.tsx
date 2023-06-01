
import { FC, useContext } from 'react'
import { useActor } from '@xstate/react'

import Tile from '@/components/Tile'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import styles from './Game.module.scss'

const Game: FC = () => {
  const actor = useContext(WibbleStateMachineContext)
  const [state] = useActor(actor)

  return (
    <main className={styles.container}>
      <div>
        {state.context.currentWord}
        {
          state.context.currentScore > 0
            ? ` +${state.context.currentScore}`
            : null
        }
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          border: '1px solid black',
          padding: '16px',

          position: 'relative'
        }}
        onPointerUp={
          (
            state.matches('play.chaining')
              ? () => {
                  actor.send('STOP_CHAINING')
                }
              : undefined
          )
        }
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
                    location={[colIndex, rowIndex]}
                    {...data}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
      <span>
        SCORE: {state.context.totalScore}
      </span>
    </main>
  )
}

export default Game
