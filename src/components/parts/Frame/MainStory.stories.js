import { withKnobs } from '@storybook/addon-knobs'
import MainStory from './MainStory.svelte'

export default {
  title: 'MainStory',
  component: MainStory,
  decorators: [withKnobs],
}

export const Default = () => ({
  Component: MainStory,
  props: {},
})
