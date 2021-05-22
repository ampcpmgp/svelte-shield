# ![Svelte Shield](./src/images/svelte-shield-silver.png)

様々な日本語文章を、目線移動無くサクサク読めるようにしたツールです。

* [Web版](https://ampcpmgp.github.io/svelte-shield/)
* [Chrome 拡張機能版](https://chrome.google.com/webstore/detail/svelte-shield-%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD/ogdlcilfgiojgaoglhhilbhnghchnceo?hl=ja&authuser=0)

## Setup

```shell
npm i
```

## Start

```shell
npm start # Open http://localhost:1234/patterns.html
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

## Test

```shell
npm test
# or watch mode
npm run test:watch
# or watch spefied test name
npx ava --match 'composite/example' --watch
```

### Add a test sentence

`test-tools/generate-test.js` の `fileName` 変数にファイル名、 `sentence` 変数に文章を入れ、以下を実行してください。

```shell
node test-tools/generate-test.js
```

そうすると `src/states/morpheme-composite/` にテスト対象のファイルが生成されます。

`test-tools/generate-test.js` をコミット差分には含まないようにしてください。

## Chrome Extension

以下を実行後、出力された dist ファイルを、 <chrome://extensions/> より取り込みます。

```shell
npm run build-ext
```
