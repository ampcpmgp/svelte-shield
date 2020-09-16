const kuromoji = require('kuromoji')

const fileName = 'B細胞'
const sentence = `
1個のB細胞は表面上の抗体が特定の外来抗原に結合すると病原体を認識することになる。
`

const dir = 'src/states/morpheme-test/'

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
