import 'modern-css-reset/dist/reset.min.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'gray',
    values: [
      { name: 'gray', value: 'gray' },
      { name: 'lightgreen', value: 'lightgreen' },
    ],
  },
}
