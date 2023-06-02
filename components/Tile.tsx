import { FC, useContext, useCallback } from 'react'
import { useSelector } from '@xstate/react'

import { TileData } from '@/types'
import { WibbleStateMachineContext } from '@/stores/wibbleStateMachine'

import style from './Tile.module.scss'

interface TileProps extends TileData {
  location: [number, number]
}

const Tile: FC<TileProps> = ({ letter, score, location }) => {
  const actor = useContext(WibbleStateMachineContext)
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
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='
              M 0, 75
              C 0, 18.75 18.75, 0 75, 0
              S 150, 18.75 150, 75
                131.25, 150 75, 150
                0, 131.25 0, 75
            '
            fill='#FFBA08'
            transform='
              rotate(
                0,
                100,
                100
              )
              translate(
                  25
                  25
              )'
          />
        </svg>
        <svg
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            position: 'absolute',
            top: '68.75%',
            left: '68.75%',
            bottom: 0,
            right: 0,
            height: '40px',
            width: '40px',
            padding: 0
          }}
        >
          <circle cx='16' cy='16' r='16' fill='#FFBA08' />
        </svg>
      </div>

      {letter}

      <div className={style.tileScore}>
        {score}
      </div>
    </div>
  )
}

const NewTile: FC<TileProps> = ({ letter, score }) => (
  <div
    style={{
      position: 'relative',
      width: '64px',
      height: '64px'
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        gap: '10px',
        isolation: 'isolate',

        position: 'absolute',
        width: '64px',
        height: '64px',
        left: 0,
        top: 0
      }}
    >
      {letter}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,

          position: 'absolute',
          width: '20px',
          height: '20px',
          right: 0,
          bottom: 0
        }}
      >
        <p
          style={{
            width: '5px',
            height: '8px',
            zIndex: 1
          }}
        >
          {score}
        </p>
      </div>
    </div>
    <div>
      <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='
            M 0, 75
            C 0, 18.75 18.75, 0 75, 0
            S 150, 18.75 150, 75
              131.25, 150 75, 150
              0, 131.25 0, 75
          '
          fill='#FFBA08'
          transform='
            rotate(
              0,
              100,
              100
            )
            translate(
                25
                25
            )'
        />
      </svg>
    </div>
  </div>
)

export default NewTile
