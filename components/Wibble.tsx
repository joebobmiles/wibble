import { FC, useContext } from 'react'
import { useActor } from '@xstate/react'
import { AnimatePresence } from 'framer-motion'

import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import Game from './Game'
import Title from './Title'

const Wibble: FC = () => {
  const actor = useContext(WibbleStateMachineContext)
  const [state] = useActor(actor)

  return (
    <AnimatePresence>
      {
        state.matches('title')
          ? <Title key='title' />
          : <Game key='game' />
      }
    </AnimatePresence>
  )
}

export default Wibble
