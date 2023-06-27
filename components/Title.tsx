import { FC, useContext } from 'react'
import { motion } from 'framer-motion'

import Tile from '@/components/Tile'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import styles from './Title.module.scss'

const Title: FC = () => {
  const actor = useContext(WibbleStateMachineContext)

  return (
    <main className={styles.container}>
      <motion.div
        key='title'
        className={styles.titleGrid}
        initial={false}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className={styles.titleRow}>
          <Tile title letter='W' score={4} location={[0, 0]} />
          <Tile title letter='I' score={1} location={[0, 0]} />
          <Tile title letter='B' score={3} location={[0, 0]} />
          <Tile title letter='B' score={3} location={[0, 0]} />
          <Tile title letter='L' score={1} location={[0, 0]} />
          <Tile title letter='E' score={1} location={[0, 0]} />
        </div>
      </motion.div>
      <motion.button
        key='button'
        className={styles.playButton}
        onClick={() => actor.send('START_GAME')}
        initial={false}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        Play
      </motion.button>
    </main>
  )
}

export default Title
