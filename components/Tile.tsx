import { FC, useContext, useState, useEffect } from 'react'
import { useSelector } from '@xstate/react'

import { TileData } from '@/types'
import { GameStateMachineContext } from '@/stores/gameStateMachine'

import style from './Tile.module.scss'

interface TypeProps extends TileData {
  location: [number, number]
}

const Tile: FC<TypeProps> = ({ letter, score, location }) => {
  const actor = useContext(GameStateMachineContext)
  const isChaining = useSelector(actor, (state) => state.matches('play.chaining'))

  const [isSelected, setSelected] = useState(false)

  useEffect(() => {
    if (!isChaining) {
      setSelected(false)
    }
  }, [isChaining])

  return (
    <div
      className={isSelected ? style.tileSelected : style.tile}
      {
        ...(
          !isChaining
            ? {
                onPointerDown: () => {
                  actor.send({ type: 'ADD_LETTER', location })
                  setSelected(true)
                }
              }
            : {
                onPointerEnter: () => {
                  actor.send({ type: 'ADD_LETTER', location })
                  setSelected(true)
                }
              }
        )
      }
    >
      {letter}
      <div className={style.tileScore}>
        {score}
      </div>
    </div>
  )
}

export default Tile
