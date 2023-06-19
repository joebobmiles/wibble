import type { Meta, StoryObj } from '@storybook/react'

import { useInterpret } from '@xstate/react'
import { WibbleStateMachineContext, wibbleStateMachine } from '@/stores/wibbleStateMachine'

import Tile from './Tile'

const meta: Meta<typeof Tile> = {
  title: 'Tile',
  component: Tile,
  decorators: [
    (Story) => {
      const actor = useInterpret(wibbleStateMachine)

      return (
        <WibbleStateMachineContext.Provider value={actor}>
          <Story />
        </WibbleStateMachineContext.Provider>
      )
    }
  ],
  argTypes: {
    selected: {
      control: { type: 'boolean' }
    },
    location: {
      table: {
        disable: true
      }
    },
    title: {
      table: {
        disable: true
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Tile>

export const Default: Story = {
  render: (args) => <Tile letter='A' score={1} location={[0, 0]} selected={args.selected} />,
  args: {
    selected: false
  }
}

export const Title: Story = {
  render: () => <Tile letter='A' score={1} location={[0, 0]} title />
}
