import { linkTo } from '@storybook/addon-links'
import { withKnobs, text } from '@storybook/addon-knobs'
import Header from './Header.svelte'

export default {
  title: 'Header',
  component: Header,
  decorators: [withKnobs],
}

export const Text = () => ({
  Component: Header,
  props: { text: text('text', 'Text') },
  on: { click: linkTo('Header', 'Emoji') },
})

export const Emoji = () => ({
  Component: Header,
  props: {
    text: text('text', '😀 😎 👍 💯'),
  },
  on: { click: console.info },
})
