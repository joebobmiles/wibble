import { FC } from 'react'

import Tile from '../components/Tile'

const board = [
  ['A', 'B', 'C', 'D', 'E'],
  ['A', 'B', 'C', 'D', 'E'],
  ['A', 'B', 'C', 'D', 'E'],
  ['A', 'B', 'C', 'D', 'E'],
  ['A', 'B', 'C', 'D', 'E']
]

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
    {
      board.map((row, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px'
          }}
        >
          {
            row.map((letter, index) => (
              <Tile key={index} letter={letter} score={1} />
            ))
          }
        </div>
      ))
    }
  </div>
)

export default App
