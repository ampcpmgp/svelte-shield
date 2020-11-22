import { default as IPFS } from 'ipfs'

let nodeP

async function getNode() {
  if (nodeP) return await nodeP

  const createdNode = await IPFS.create()
  createdNode.add('')
  return createdNode
}

export function init() {
  nodeP = getNode()
}

export async function add(data) {
  const node = await getNode()
  const results = await node.add(data)

  return results
}
