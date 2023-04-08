import { FC } from 'react'
import { useInterpret } from '@xstate/react'

import Game from '@/components/Game'
import { gameStateMachine, GameStateMachineContext } from '@/stores/gameStateMachine'

const App: FC = () => {
  const actor = useInterpret(gameStateMachine)

  return (
    <GameStateMachineContext.Provider value={actor}>
      <Game />
    </GameStateMachineContext.Provider>
  )
}

export default App
