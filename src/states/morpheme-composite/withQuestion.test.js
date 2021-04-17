import test from "ava";
import json from "./withQuestion.json";
import { composite } from "../morpheme";

test("composite/withQuestion", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "「なんで結婚しないの？」",
    "「ずっと独身でいるつもり？」",
    "「早く安心させてくれ」",
  ]);
});
