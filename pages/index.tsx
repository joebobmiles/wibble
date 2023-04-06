import { FC } from 'react'

import Tile from '../components/Tile'

const App: FC = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      border: '1px solid black',
      padding: '16px'
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px'
      }}
    >
      <Tile letter='A' score={1} />
      <Tile letter='B' score={2} />
    </div>
  </div>
)

export default App
