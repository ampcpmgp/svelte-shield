import { default as IPFS } from 'ipfs'

let node

async function getNode() {
  if (node) return node

  const createdNode = await IPFS.create()
  return createdNode
}

export async function init() {
  node = await getNode()
}
