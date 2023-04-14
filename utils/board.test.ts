import { getLetterByProbability } from './board'

describe('randomLetter', () => {
  it('Returns tile data for an arbitrary value between 0 and 1', () => {
    expect(getLetterByProbability(0.21)).toStrictEqual({
      letter: 'U',
      score: 1
    })
  })
})
