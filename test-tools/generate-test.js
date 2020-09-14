const kuromoji = require('kuromoji')

const dir = 'src/states/morpheme-test/'
const fileName = 'Wikipedia宇宙'
const sentence = `
これに対し、ウィトゲンシュタインをはじめとする不可知論の立場からは、「語りえないものについては、沈黙しなければならない」との論がある。
`

function js() {
  return `import test from 'ava'
import json from './${fileName}.json'
import { composite } from '../morpheme'

test('composite/${fileName}', t => {
  const result = composite(json)

  t.deepEqual(result, [])
})
`
}

kuromoji
  .builder({ dicPath: 'node_modules/kuromoji/dict' })
  .build(function(err, tokenizer) {
    if (err) throw err

    const path = tokenizer.tokenize(sentence)
    const json = JSON.stringify(path, null, '  ')
    const jsonPath = require('path').join(dir, `${fileName}.json`)
    const testPath = require('path').join(dir, `${fileName}.test.js`)

    require('fs').writeFileSync(jsonPath, json)
    console.log(`Created ${jsonPath}`)

    require('fs').writeFileSync(testPath, js())
    console.log(`Created ${testPath}`)
  })
