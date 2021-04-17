import test from "ava";
import json from "./数値区切りカンマ.json";
import { composite } from "../morpheme";

/* 原文
北極の六角形構造は、直線部の一辺が地球の直径を越える長さ約13,800kmである[52]。
*/

test("composite/数値区切りカンマ", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "北極の",
    "六角形構造は、",
    "直線部の",
    "一辺が地球の",
    "直径を越える長さ約13,800kmである[52]。",
  ]);
});
