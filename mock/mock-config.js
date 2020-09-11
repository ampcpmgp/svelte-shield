import mock from 'am-mocktimes'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as morpheme from '../src/states/morpheme'

mock({
  sleep,
  morpheme,

  page(name) {
    replace(name)
  },

  click(selector) {
    document.querySelector(selector).click()
  },
})
