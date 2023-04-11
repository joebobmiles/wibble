import { FC, useContext } from 'react'
import { useSelector } from '@xstate/react'

import { TileData } from '@/types'
import { GameStateMachineContext } from '@/stores/gameStateMachine'

import style from './Tile.module.scss'

interface TypeProps extends TileData {
}

const Tile: FC<TypeProps> = ({ letter, score }) => {
  const actor = useContext(GameStateMachineContext)
  const isChaining = useSelector(actor, (state) => state.matches('play.chaining'))

  return (
    <div
      className={style.tile}
      {
        ...(
          !isChaining
            ? {
                onPointerDown: () => {
                  actor.send({ type: 'ADD_LETTER', letter })
                }
              }
            : {
                onPointerEnter: () => {
                  actor.send({ type: 'ADD_LETTER', letter })
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
