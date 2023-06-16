import { FC, useContext } from 'react'

import Tile from '@/components/Tile'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import styles from './Title.module.scss'

const Title: FC = () => {
  const actor = useContext(WibbleStateMachineContext)

  return (
    <main className={styles.container}>
      <div className={styles.titleGrid}>
        <div className={styles.titleRow}>
          <Tile letter='W' score={4} location={[0, 0]} />
          <Tile letter='I' score={1} location={[0, 0]} />
          <Tile letter='B' score={3} location={[0, 0]} />
          <Tile letter='B' score={3} location={[0, 0]} />
          <Tile letter='L' score={1} location={[0, 0]} />
          <Tile letter='E' score={1} location={[0, 0]} />
        </div>
      </div>
      <button
        className={styles.playButton}
        onClick={() => actor.send('START_GAME')}
      >
        Play
      </button>
    </main>
  )
}

export default Title
