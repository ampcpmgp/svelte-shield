import Notification from './Notification.svelte'

export default {
  title: 'Notification',
  component: Notification,
  argTypes: {},
}

const Template = ({ ...args }) => ({
  Component: Notification,
  props: args,
  on: {},
})

export const Default = Template.bind({})
Default.args = {
  isVisible: true,
  message: 'ネットワーク環境に問題があります。',
  strongMsg: '通信エラー!',
  type: 'alert-danger',
}
