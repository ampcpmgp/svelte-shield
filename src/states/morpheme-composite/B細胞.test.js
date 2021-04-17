import test from "ava";
import json from "./B細胞.json";
import { composite } from "../morpheme";

/* 原文
1個のB細胞は表面上の抗体が特定の外来抗原に結合すると病原体を認識することになる。
*/

test("composite/B細胞", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "1個の",
    "B細胞は",
    "表面上の",
    "抗体が特定の",
    "外来抗原に",
    "結合すると",
    "病原体を",
    "認識する",
    "ことになる。",
  ]);
});
