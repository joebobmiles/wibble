import { TileData } from '../types'

export const tiles = [
  { letter: 'A', score: 1 },
  { letter: 'B', score: 3 },
  { letter: 'C', score: 3 },
  { letter: 'D', score: 2 },
  { letter: 'E', score: 1 },
  { letter: 'F', score: 4 },
  { letter: 'G', score: 2 },
  { letter: 'H', score: 4 },
  { letter: 'I', score: 1 },
  { letter: 'J', score: 8 },
  { letter: 'K', score: 5 },
  { letter: 'L', score: 1 },
  { letter: 'M', score: 3 },
  { letter: 'N', score: 1 },
  { letter: 'O', score: 1 },
  { letter: 'P', score: 3 },
  { letter: 'Q', score: 10 },
  { letter: 'R', score: 1 },
  { letter: 'S', score: 1 },
  { letter: 'T', score: 1 },
  { letter: 'U', score: 1 },
  { letter: 'V', score: 4 },
  { letter: 'W', score: 4 },
  { letter: 'X', score: 8 },
  { letter: 'Y', score: 4 },
  { letter: 'Z', score: 10 }
]

export const randomLetter = (): TileData =>
  tiles[Math.floor((Math.random() * (tiles.length - 1)))]

export const generateRandomBoard = (): TileData[][] => {
  const board = [] as TileData[][]

  for (let r = 0; r < 5; r++) {
    board[r] = [] as TileData[]

    for (let c = 0; c < 5; c++) {
      board[r][c] = randomLetter()
    }
  }

  return board
}

export const generateTitleBoard = (): TileData[][] => {
  const board = [] as TileData[][]

  for (let r = 0; r < 5; r++) {
    board[r] = [
      tiles[22], // W
      tiles[8], // I
      tiles[1], // B
      tiles[11], // L
      tiles[4] // E
    ] as TileData[]
  }

  return board
}
