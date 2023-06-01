import { FC } from 'react'
import { useInterpret } from '@xstate/react'

import Wibble from '@/components/Wibble'
import { wibbleStateMachine, WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

const App: FC = () => {
  const actor = useInterpret(wibbleStateMachine)

  return (
    <WibbleStateMachineContext.Provider value={actor}>
      <Wibble />
    </WibbleStateMachineContext.Provider>
  )
}

export default App
