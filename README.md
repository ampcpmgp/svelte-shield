# Svelte Shield

様々な日本語文章を、目線移動無く早く読めるようにしたツール。

<https://ampcpmgp.github.io/svelte-shield/>

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

## Lint

```shell
npm run lint
```

or vscode extensions <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

## Code Format

```shell
npm run format
```

or vscode extensions <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

### Add a test sentence

`test-tools/generate-test.js` の `fileName` 変数にファイル名、 `sentence` 変数に文章を入れ、以下を実行してください。

```shell
node test-tools/generate-test.js
```

そうすると `src/states/morpheme-composite/` にテスト対象のファイルが生成されます。

`test-tools/generate-test.js` をコミット差分には含まないようにしてください。
