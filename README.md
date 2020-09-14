# Riot Shield

様々な日本語文章を、目線移動無く早く読めるようにしたツール。

<https://ampcpmgp.github.io/riot-shield/>

## Setup

```shell
npm i
```

## Start

```shell
npm start # Open http://localhost:1234/patterns.html
```

## Test

```shell
npm test
# or watch mode
npm run test:watch
# or watch spefied test name
npx ava --match 'composite/example' --watch
```

### Add a test sentence

`test-tools/generate-test.js` の `fileName` にファイル名と `sentence` に文章を入れ、以下を実行してください。

```shell
node test-tools/generate-json.js
```

そうすると `src/states/morpheme-test/` にテスト対象のファイルが生成されます。

`test-tools/generate-test.js` をコミット差分には含まないようにしてください。
