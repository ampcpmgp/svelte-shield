import test from "ava";
import json from "./小文字？のケース.json";
import { composite } from "../morpheme";

/* 原文
複数の家族が同じ動物との接触で病気になりましたか? Gao は、人から人への感染はないことを彼に保証した、と Redfield は言います。
*/

test("composite/小文字？のケース", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "複数の家族が",
    "同じ動物との",
    "接触で病気に",
    "なりましたか?",
    "Gao は、",
    "人から人への",
    "感染はない",
    "ことを彼に",
    "保証した、",
    "と Redfield",
    "は言います。",
  ]);
});
