import MainStory from './MainStory.svelte'

export default {
  title: 'MainStory',
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
