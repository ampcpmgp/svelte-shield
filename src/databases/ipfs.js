import { default as IPFS } from 'ipfs'

/**
 * ファイル読み込み時に getNode を読んでもパフォーマンスに大きな影響は出ないが、 IPFS は現状問題の無い
 * websocket のエラーが多発しているため、不要なログを出さないためにも、必要なページだけ
 * node を create するようにする。
 * 参考記事: https://stackoverflow.com/questions/63563162/ipfs-js-cant-connect-to-ws-127-0-0-18081-p2p
 */
let _nodeP

async function getNode() {
  if (_nodeP) return await _nodeP

  const createdNode = await IPFS.create()

  return createdNode
}

export function init() {
  _nodeP = getNode()
}

export async function add(data) {
  const node = await getNode()

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
  const results = await node.add(data)

  return results
}

export async function get(hash) {
  const node = await getNode()
  const content = []

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options
  for await (const file of node.get(hash)) {
    if (!file.content) throw new Error('No content')

    for await (const chunk of file.content) {
      content.push(...chunk)
    }

    return content
  }
}