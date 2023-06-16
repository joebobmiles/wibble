
import type { Meta, StoryObj } from '@storybook/react'

import { useInterpret } from '@xstate/react'
import { WibbleStateMachineContext, wibbleStateMachine } from '@/stores/wibbleStateMachine'

import Title from './Title'

const meta: Meta<typeof Title> = {
  title: 'Title',
  component: Title,
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
type Story = StoryObj<typeof Title>

export const Default: Story = {
  render: () => <Title />
}
