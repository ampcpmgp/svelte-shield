import { withKnobs, text } from '@storybook/addon-knobs'
import Main from './Main.svelte'

export default {
  title: 'Main',
  component: Main,
  decorators: [withKnobs],
}

export const Default = () => ({
  Component: Main,
  props: {
    message: text('message', 'dummy-text'),
  },
})
