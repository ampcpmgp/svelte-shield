import test from "ava";
import json from "./半角クエスチョンと括弧閉じ文.json";
import { composite } from "../morpheme";

/* 原文
例: 「このコホート ID を持っている人は車が好きですか?」サイトが行う必要があるのは、FLoC API を呼び出してコホート ID を取得し、それを使用してサービス内の情報を検索することだけです。
*/

test("composite/半角クエスチョンと括弧閉じ文", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "例: 「このコホート ID を持っている人は車が好きですか?」サイトが",
    "行う必要が",
    "あるのは、",
    "FLoC",
    "API",
    "を呼び出して",
    "コホート",
    "ID を",
    "取得し、",
    "それを使用して",
    "サービス内の",
    "情報を検索する",
    "ことだけです。",
  ]);
});
