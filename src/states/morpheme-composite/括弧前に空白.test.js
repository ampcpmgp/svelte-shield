import test from "ava";
import json from "./括弧前に空白.json";
import { composite } from "../morpheme";

/* 原文
軟骨魚類
IgMの他にIgW、IgW (long)、IgNARと呼ばれるクラスを持つ
硬骨魚類
IgMとIgD、IgT(IgZ)を持つ
ハイギョ
IgM, IgW, IgW (long) を持つ
爬虫類
IgMの他、IgYと呼ばれるクラスを持つ[8]
両生類（アフリカツメガエル）
IgMの他、IgXとIgYと呼ばれるクラスを持つ
*/

test("composite/括弧前に空白", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "軟骨魚類",
    "IgMの他にIgW、IgW (long)、IgNARと呼ばれるクラスを持つ",
    "硬骨魚類",
    "IgMとIgD、IgT(IgZ)を持つ",
    "ハイギョ",
    "IgM, IgW, IgW (long) を持つ",
    "爬虫類",
    "IgMの他、IgYと呼ばれるクラスを持つ[8]",
    "両生類（アフリカツメガエル）",
    "IgMの他、IgXとIgYと呼ばれるクラスを持つ",
  ]);
});
