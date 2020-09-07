import mock from 'am-mocktimes'
import { replace } from 'svelte-spa-router'
import sleep from '../src/utils/sleep'
import * as greetings from '../src/states/greetings'

mock({
  sleep,
  greetings,

  page(name) {
    replace(name)
  },
})
