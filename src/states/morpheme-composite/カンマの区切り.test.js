import test from "ava";
import json from "./カンマの区切り.json";
import { composite } from "../morpheme";

/* 原文
現在, 開発が進んでいるmRNAワクチンは, 脂質ナノ粒子などのキャリア分子に抗原タンパク質をコードするmRNAを封入した注射剤である。
*/

test("composite/カンマの区切り", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "現在, 開発が",
    "進んでいる",
    "mRNAワクチンは,",
    "脂質ナノ粒子などの",
    "キャリア分子に",
    "抗原タンパク質を",
    "コードする",
    "mRNAを",
    "封入した",
    "注射剤である。",
  ]);
});
