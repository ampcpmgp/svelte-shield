const kuromoji = require('kuromoji')

const jsonDir = 'src/states/json'
const jsonFileName = 'example.json'
const sentence = `
これはサンプル用のテスト文章です。
`

kuromoji
  .builder({ dicPath: 'node_modules/kuromoji/dict' })
  .build(function(err, tokenizer) {
    if (err) throw err

    const path = tokenizer.tokenize(sentence)
    const json = JSON.stringify(path, null, '  ')
    const filePath = require('path').join(jsonDir, jsonFileName)

    require('fs').writeFileSync(filePath, json)
  })
