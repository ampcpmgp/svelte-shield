import test from "ava";
import json from "./段落ひとまとめ.json";
import { composite } from "../morpheme";

/* 原文
1 前成説と後成説
2 動物の発生過程
2.1 前核の出現
2.2 卵割
*/

test("composite/段落ひとまとめ", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "1 前成説と後成説",
    "2 動物の発生過程",
    "2.1 前核の出現",
    "2.2 卵割",
  ]);
});
