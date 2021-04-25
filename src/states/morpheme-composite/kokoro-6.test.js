import test from "ava";
import json from "./kokoro-6.json";
import { composite } from "../morpheme";

/* 原文
私は実に先生をこの雑沓の間に見付け出したのである。その時海岸には掛茶屋が二軒あった。私はふとした機会からその一軒の方に行き慣れていた。長谷辺に大きな別荘を構えている人と違って、各自に専有の着換場を拵えていないここいらの避暑客には、ぜひともこうした共同着換所といった風なものが必要なのであった。彼らはここで茶を飲み、ここで休息する外に、ここで海水着を洗濯させたり、ここで鹹はゆい身体を清めたり、ここへ帽子や傘を預けたりするのである。海水着を持たない私にも持物を盗まれる恐れはあったので、私は海へはいるたびにその茶屋へ一切を脱ぎ棄てる事にしていた。
*/

test("composite/kokoro-6", (t) => {
  const result = composite(json).map((item) => item.word);

  t.deepEqual(result, [
    "私は実に先生を",
    "この雑沓の",
    "間に見付け出した",
    "のである。",
    "その時海岸には",
    "掛茶屋が",
    "二軒あった。",
    "私はふとした機会から",
    "その一軒の",
    "方に行き慣れて",
    "いた。",
    "長谷辺に",
    "大きな別荘を",
    "構えている",
    "人と違って、",
    "各自に専有の",
    "着換場を",
    "拵えていない",
    "ここいらの",
    "避暑客には、",
    "ぜひとも",
    "こうした共同着換所といった",
    "風なものが",
    "必要なのであった。",
    "彼らはここで",
    "茶を飲み、",
    "ここで休息する",
    "外に、",
    "ここで",
    "海水着を",
    "洗濯させたり、",
    "ここで鹹は",
    "ゆい身体を",
    "清めたり、",
    "ここへ帽子や",
    "傘を預けたり",
    "するのである。",
    "海水着を",
    "持たない",
    "私にも持物を",
    "盗まれる",
    "恐れはあったので、",
    "私は海へは",
    "いるたびに",
    "その茶屋へ",
    "一切を脱ぎ棄てる事に",
    "していた。",
  ]);
});