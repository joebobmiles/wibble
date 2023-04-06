import { FC } from 'react'

import { TileData } from '../types'

import style from './Tile.module.scss'

const Tile: FC<TileData> = ({ letter, score }) => (
  <div className={style.tile}>
    {letter}
    <div className={style.tileScore}>
      {score}
    </div>
  </div>
)

export default Tile
