import MainStory from './MainStory.svelte'

export default {
  title: 'Main',
  component: MainStory,
  argTypes: {},
}

const Template = ({ ...args }) => ({
  Component: MainStory,
  props: args,
  on: {},
})

export const Default = Template.bind({})
Default.args = {}
