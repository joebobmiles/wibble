import { FC } from 'react'

import style from './Tile.module.scss'

const Tile: FC<{ letter: string, score: number }> = ({ letter, score }) => (
  <div className={style.tile}>
    {letter}
    <div className={style.tileScore}>
      {score}
    </div>
  </div>
)

export default Tile
