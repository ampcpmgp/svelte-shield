// import { get, writable } from 'svelte/store'
// import * as ipfs from '../../databases/ipfs'
// import * as db from '../../databases/dexie'
// import { default as BookType } from '../../const/BookType'

// export const title = writable('')
// export const url = writable('')
// export const license = writable(undefined)
// export const content = writable('')

/**
 * 本取得ロジック
 * IndexedDB を見る
 * 無ければ IPFS を見にいく
 * データがあれば IndexedDB に格納
 * データを利用する
 */
