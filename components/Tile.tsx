import { FC } from 'react'

import { TileData } from '@/types'

import style from './Tile.module.scss'

interface TypeProps extends TileData {
}

const Tile: FC<TypeProps> = ({ letter, score }) => {
  return (
    <div className={style.tile}>
      {letter}
      <div className={style.tileScore}>
        {score}
      </div>
    </div>
  )
}

export default Tile
