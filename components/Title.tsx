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
        className={styles.titleGrid}
        exit={{ width: 0, height: 0, scale: 0 }}
        transition={{ type: 'spring', stiffness: 431.9, damping: 24, mass: 1 }}
      >
        <motion.div className={styles.titleRow} exit={{ display: 'none' }}>
          <Tile title letter='W' score={4} location={[0, 0]} />
          <Tile title letter='I' score={1} location={[0, 0]} />
          <Tile title letter='B' score={3} location={[0, 0]} />
          <Tile title letter='B' score={3} location={[0, 0]} />
          <Tile title letter='L' score={1} location={[0, 0]} />
          <Tile title letter='E' score={1} location={[0, 0]} />
        </motion.div>
      </motion.div>
      <motion.button
        className={styles.playButton}
        onClick={() => actor.send('START_GAME')}
        exit={{ translateY: '50vh' }}
        transition={{ type: 'spring', stiffness: 431.9, damping: 24, mass: 1 }}
      >
        Play
      </motion.button>
    </main>
  )
}

export default Title
