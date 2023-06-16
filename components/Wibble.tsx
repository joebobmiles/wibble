import { FC, useContext } from 'react'
import { useActor } from '@xstate/react'

import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import Game from './Game'
import Title from './Title'

const Wibble: FC = () => {
  const actor = useContext(WibbleStateMachineContext)
  const [state] = useActor(actor)

  return (
    state.matches('title')
      ? <Title />
      : <Game />
  )
}

export default Wibble
