import { FC, useContext } from 'react'

import { TileData } from '@/types'
import { GameStateMachineContext } from '@/stores/gameStateMachine'

import style from './Tile.module.scss'

interface TypeProps extends TileData {
}

const Tile: FC<TypeProps> = ({ letter, score }) => {
  const actor = useContext(GameStateMachineContext)

  return (
    <div
      className={style.tile}
      onClick={() => {
        console.log(`SENDING LETTER: ${letter}`)
        actor.send({ type: 'ADD_LETTER', letter })
      }}
    >
      {letter}
      <div className={style.tileScore}>
        {score}
      </div>
    </div>
  )
}

export default Tile
