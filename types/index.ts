export interface TileData {
  letter: string
  score: number
}

export interface GameData {
  board: TileData[][]
  currentChain: Array<[number, number]>
  currentWord: string
  currentScore: number
  totalScore: number
}
