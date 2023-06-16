
import type { Meta, StoryObj } from '@storybook/react'

import { useInterpret } from '@xstate/react'
import { WibbleStateMachineContext, wibbleStateMachine } from '@/stores/wibbleStateMachine'

import Game from './Game'

const meta: Meta<typeof Game> = {
  title: 'Game',
  component: Game,
  decorators: [
    (Story) => {
      const actor = useInterpret(wibbleStateMachine)

      return (
        <WibbleStateMachineContext.Provider value={actor}>
          <Story />
        </WibbleStateMachineContext.Provider>
      )
    }
  ]
}

export default meta
type Story = StoryObj<typeof Game>

export const Default: Story = {
  render: () => <Game />
}
