import type { Meta, StoryObj } from '@storybook/react'

import Tile from './Tile'

const meta: Meta<typeof Tile> = {
  title: 'Tile',
  component: Tile
}

export default meta
type Story = StoryObj<typeof Tile>

export const Default: Story = {
  render: () => <Tile letter='A' score={1} location={[0, 0]} />
}
