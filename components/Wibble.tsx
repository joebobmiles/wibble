import { FC, useContext } from 'react'
import { useActor } from '@xstate/react'

import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import Game from './Game'
import Title from './Title'

import styles from './Wibble.module.scss'

const Wibble: FC = () => {
  const actor = useContext(WibbleStateMachineContext)
  const [state] = useActor(actor)

  return (
    <main className={styles.container}>
      {
        state.matches('title')
          ? <Title />
          : <Game />
      }
    </main>
  )
}

export default Wibble
