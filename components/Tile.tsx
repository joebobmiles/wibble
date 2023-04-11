import { FC, useContext, useCallback } from 'react'
import { useSelector } from '@xstate/react'

import { TileData } from '@/types'
import { GameStateMachineContext } from '@/stores/gameStateMachine'

import style from './Tile.module.scss'

interface TypeProps extends TileData {
  location: [number, number]
}

const Tile: FC<TypeProps> = ({ letter, score, location }) => {
  const actor = useContext(GameStateMachineContext)
  const {
    isChaining,
    tailOfChain,
    isSelected
  } = useSelector(actor, (state) => ({
    isChaining: state.matches('play.chaining'),
    tailOfChain: state.context.currentChain.slice(-2),
    isSelected: state.context.currentChain.find((l) => l.toString() === location.toString())
  }))

  const addLetter = useCallback(() => {
    actor.send({ type: 'ADD_LETTER', location })
  }, [actor, location])

  const removeLetter = useCallback(() => {
    if (tailOfChain[0].toString() === location.toString()) {
      actor.send('REMOVE_LETTER')
    }
  }, [actor, location, tailOfChain])

  return (
    <div
      className={(isSelected != null) ? style.tileSelected : style.tile}
      {
        ...(
          !isChaining
            ? { onPointerDown: addLetter }
            : (
                { onPointerEnter: ((isSelected != null) ? removeLetter : addLetter) }
              )
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
