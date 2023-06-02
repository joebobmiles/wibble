import { FC, useContext } from 'react'

import Tile from '@/components/Tile'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

const Title: FC = () => {
  const actor = useContext(WibbleStateMachineContext)

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          padding: '32px',
          background: '#FFE8AE',
          borderRadius: '32px',

          position: 'relative'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '32px'
          }}
        >
          <Tile letter='W' score={4} location={[0, 0]} />
          <Tile letter='I' score={1} location={[0, 0]} />
          <Tile letter='B' score={3} location={[0, 0]} />
          <Tile letter='B' score={3} location={[0, 0]} />
          <Tile letter='L' score={1} location={[0, 0]} />
          <Tile letter='E' score={1} location={[0, 0]} />
        </div>
      </div>
      <button onClick={() => actor.send('START_GAME')}>
        Play
      </button>
    </>
  )
}

export default Title
