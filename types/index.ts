export interface TileData {
  letter: string
  score: number
}

export interface GameData {
  board: TileData[][]
  currentWord: string
  currentScore: number
}
