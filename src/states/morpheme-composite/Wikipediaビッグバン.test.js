import test from "ava";
import json from "./Wikipediaビッグバン.json";
import { composite } from "../morpheme";

/* 原文
インフレーション理論によれば、時空の指数関数的急膨張（インフレーション）後に相転移により生まれた超高温高密度のエネルギーの塊がビッグバン膨張の開始になる[2]。その時刻は今から138.2億年（13.82 × 10^9年）前と計算されている[3]。
*/

test("composite/Wikipediaビッグバン", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "インフレーション理論に",
    "よれば、",
    "時空の指数関数的急膨張（インフレーション）後に",
    "相転移により",
    "生まれた",
    "超高温高密度の",
    "エネルギーの",
    "塊がビッグバン膨張の",
    "開始になる[2]。",
    "その時刻は",
    "今から138.2億年（13.82 × 10^9年）",
    "前と計算されて",
    "いる[3]。",
  ]);
});
