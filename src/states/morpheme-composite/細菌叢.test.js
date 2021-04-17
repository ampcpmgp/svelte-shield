import test from "ava";
import json from "./細菌叢.json";
import { composite } from "../morpheme";

/*
生殖尿管や胃腸管では共生している細菌叢が病原菌と養分や繁殖場所をめぐって病原体と競争して生物学的防壁として機能する。
*/

test("composite/細菌叢", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "生殖尿管や",
    "胃腸管では",
    "共生している",
    "細菌叢が",
    "病原菌と",
    "養分や",
    "繁殖場所をめぐって",
    "病原体と",
    "競争して",
    "生物学的防壁として",
    "機能する。",
  ]);
});
