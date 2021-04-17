import { default as IPFS } from "ipfs";

// 3MB を超えるものファイルはエラー
const MAX_FILE_SIZE = 1024 * 1024 * 3;

/**
 * 本来は webrtc-star の使う必要がある
 * 参考記事: https://stackoverflow.com/questions/63563162/ipfs-js-cant-connect-to-ws-127-0-0-18081-p2p
 */
const nodeP = getNode();

async function getNode() {
  const createdNode = await IPFS.create();

  return createdNode;
}

export async function add(data) {
  const node = await nodeP;

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsadddata-options
  const results = await node.add(data);

  return results;
}

export async function get(hash, controller, onChunk) {
  const node = await nodeP;
  const content = [];

  const files = await node.get(hash, { signal: controller.signal });

  // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfsgetipfspath-options
  for await (const file of files) {
    if (!file.content) throw new Error("No content");

    for await (const chunk of file.content) {
      if (content.length > MAX_FILE_SIZE)
        throw new Error("Fize Size too large");

      content.push(...chunk);
      onChunk(content.length);
    }

    return content;
  }
}

export async function addPin(hash) {
  const node = await nodeP;

  await node.pin.add(hash);
}

export async function removePin(hash) {
  const node = await nodeP;

  await node.pin.rm(hash);
}

export async function lsPin() {
  const node = await nodeP;
  const pins = node.pin.ls();

  return pins;
}

export async function existsPin(hash) {
  const node = await nodeP;
  const pins = node.pin.ls();

  for await (const pin of pins) {
    if (hash === pin.cid.toString()) return true;
  }

  return false;
}
