import { FC, useEffect, useState } from 'react'

import { generateBoard } from '../utils/board'
import { TileData } from '../types'

import Tile from '../components/Tile'

const App: FC = () => {
  const [board, setBoard] = useState<TileData[][]>([])

  useEffect(() => {
    setBoard(generateBoard())
  }, [])

  return (
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
              row.map((data, index) => (
                <Tile key={index} {...data} />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default App
