
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
      <div className={styles.word}>
        {state.context.currentWord}
        {
          state.context.currentScore > 0
            ? ` +${state.context.currentScore}`
            : null
        }
      </div>
      <div
        className={styles.board}
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
              className={styles.boardRow}
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
      <div className={styles.scoreContainer}>
        <p className={styles.scoreTitle}>
          SCORE:
        </p>
        <p className={styles.scoreValue}>
          {state.context.totalScore}
        </p>
      </div>
    </main>
  )
}

export default Game
