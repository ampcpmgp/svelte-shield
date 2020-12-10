import { default as IPFS } from 'ipfs'

/**
 * IPFS は現状問題の無い websocket のエラーが多発している。
 * 参考記事: https://stackoverflow.com/questions/63563162/ipfs-js-cant-connect-to-ws-127-0-0-18081-p2p
 */
const nodeP = getNode()

async function getNode() {
  const createdNode = await IPFS.create()

  return createdNode
}

export async function add(data) {
  const node = await nodeP

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
  const results = await node.add(data)

  return results
}

export async function get(hash) {
  const node = await nodeP
  const content = []

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options
  for await (const file of node.get(hash, { timeout: 30000 })) {
    if (!file.content) throw new Error('No content')

    for await (const chunk of file.content) {
      content.push(...chunk)
    }

    return content
  }
}

export async function addPin(hash) {
  const node = await nodeP

  await node.pin.add(hash)
}

export async function removePin(hash) {
  const node = await nodeP

  await node.pin.rm(hash)
}

export async function lsPin() {
  const node = await nodeP

  for await (const result of node.pin.ls()) {
    console.info(result)
  }
}
