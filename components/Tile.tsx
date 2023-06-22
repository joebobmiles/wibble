import { FC, useContext, useCallback } from 'react'
import { useSelector } from '@xstate/react'

import { TileData } from '@/types'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import style from './Tile.module.scss'

interface TileProps extends TileData {
  location: [number, number]
  title?: boolean
  selected?: boolean
}

const Tile: FC<TileProps> = ({ letter, score, location, title, selected }) => {
  const actor = useContext(WibbleStateMachineContext)
  const {
    isChaining,
    tailOfChain,
    isSelected
  } = useSelector(actor, (state) => ({
    isChaining: state.matches('play.chaining'),
    tailOfChain: state.context.currentChain.slice(-2),
    isSelected: state.context.currentChain.find((l) => l.toString() === location.toString()) !== undefined
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
      className={
        (title ?? false)
          ? style.titleTile
          : (
              isSelected || (selected ?? false)
                ? style.tileSelected
                : style.tile
            )
      }
      {
        ...(
          !isChaining
            ? { onPointerDown: addLetter }
            : (
                { onPointerEnter: isSelected ? removeLetter : addLetter }
              )
        )
      }
    >
      <div className={style.tileTextContainer}>
        {letter}
        <div className={style.tileScoreContainer}>
          <p>
            {score}
          </p>
        </div>
      </div>
      <div className={style.tileShapeContainer}>
        <svg
          className={style.squircle}
          viewBox='0 0 150 150'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='
              M 0, 75
              C 0, 18.75 18.75, 0 75, 0
              S 150, 18.75 150, 75
                131.25, 150 75, 150
                0, 131.25 0, 75
            '
          />
        </svg>
        <svg
          className={style.ellipse}
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='16' cy='16' r='16' />
        </svg>
      </div>
    </div>
  )
}

export default Tile
