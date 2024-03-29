import test from "ava";
import json from "./コロン：など.json";
import { composite } from "../morpheme";

/* 原文
グルタミン酸族：ケトグルタル酸（クエン酸回路）
アスパラギン酸族：オキサロ酢酸（クエン酸回路）
芳香族：ホスホエノールピルビン酸（解糖系：EM経路、ED経路） + エリトロース4リン酸（ペントースリン酸経路）
セリン族：3ホスホグリセリン酸（解糖系：EM経路、ED経路）
ピルビン酸族：ピルビン酸（解糖系：EM経路、ED経路）

糖・・・同化：糖新生系（解糖系の逆行）、異化：解糖系。
アミノ酸・・・同化：解糖系とクエン酸回路を中心としたアミノ酸合成系、異化：解糖系とクエン酸回路を中心とした分解経路。詳細はアミノ酸の代謝分解
脂肪酸・・・同化：脂肪酸生合成系、異化：β酸化経路。
*/

test("composite/コロン：など", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "グルタミン酸族：ケトグルタル酸（クエン酸回路）",
    "アスパラギン酸族：オキサロ酢酸（クエン酸回路）",
    "芳香族：ホスホエノールピルビン酸（解糖系：EM経路、ED経路） + エリトロース4リン酸（ペントースリン酸経路）",
    "セリン族：3ホスホグリセリン酸（解糖系：EM経路、ED経路）",
    "ピルビン酸族：ピルビン酸（解糖系：EM経路、ED経路）",
    "糖・・・同化：",
    "糖新生系（解糖系の逆行）、",
    "異化：解糖系。",
    "アミノ酸・・・同化：",
    "解糖系と",
    "クエン酸回路を",
    "中心とした",
    "アミノ酸合成系、",
    "異化：解糖系と",
    "クエン酸回路を",
    "中心とした",
    "分解経路。",
    "詳細はアミノ酸の",
    "代謝分解",
    "脂肪酸・・・同化：",
    "脂肪酸生合成系、",
    "異化：β",
    "酸化経路。",
  ]);
});
