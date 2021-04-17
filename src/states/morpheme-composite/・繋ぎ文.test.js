import test from "ava";
import json from "./・繋ぎ文.json";
import { composite } from "../morpheme";

/* 原文
全国の福祉事務所・自立相談支援機関・保健所・精神保健福祉センター・児童相談所・婦人相談所・総合労働相談等の公的機関や様々な分野のNPO団体へつなぎ支援を行う。
*/

test("composite/・繋ぎ文", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "全国の",
    "福祉事務所・自立相談支援機関・保健所・精神保健福祉センター・児童相談所・婦人相談所・総合労働相談等の",
    "公的機関や",
    "様々な分野の",
    "NPO団体へ",
    "つなぎ支援を",
    "行う。",
  ]);
});
