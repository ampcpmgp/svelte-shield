import mock from "am-mocktimes";
import { replace } from "svelte-spa-router";
import sleep from "../src/utils/sleep";
import * as morpheme from "../src/states/morpheme";
import * as books from "../src/states/books";
import * as book from "../src/states/book";
import * as newBook from "../src/states/newBook";
import * as ipfs from "../src/databases/ipfs";
import * as dexie from "../src/databases/dexie";
import { default as Modal } from "../src/const/modal";

mock({
  sleep,
  morpheme,
  books,
  book,
  newBook,
  ipfs,
  dexie,

  async registerBooks(length) {
    const bookCount = await dexie.getBookCount();

    if (bookCount > 100) return;

    for (const [index] of Array.from({ length }).entries()) {
      newBook.reprint.title.set(`dummy title ${index}`);
      newBook.reprint.url.set("//example.com");
      newBook.reprint.license.set({ value: "CC0-1.0" });
      newBook.reprint.content.set("dummy content");
      await newBook.reprint.save();
    }

    await books.loadBooks();
  },

  page(name) {
    replace(name);
  },

  click(selector) {
    document.querySelector(selector).click();
  },

  openModal(name) {
    document.querySelector(`[data-target="#${Modal[name]}"]`).click();
  },

  rustCoc() {
    morpheme.rawText
      .set(`私たちは、経験のレベル、性同一性および表現、性的指向、障害、個人の容姿、体格、人種、民族、年齢、宗教、国籍、その他の特徴にかかわらず、友好的かつ安全ですべての人を歓迎する環境を提供することに尽力します。
    過度に性的な偽名またはニックネームを使わないでください。友好的かつ安全ですべての人を歓迎する環境を損なうかもしれません。
    親切かつ丁寧に行動してください。意地悪や無礼をする必要はありません。
    人々には意見の相違があり、すべての設計または実装の選択にはトレードオフと数多のコストがかかることを尊重してください。正解はめったにありません。
    構造化されていない批評は最小限に留めてください。試してみたい確固たるアイデアがある場合は、フォークを作り、どのように動作するか確認してください。
    私たちは、あなたが誰かを侮辱し屈辱を与え、ハラスメントをした場合に、あなたを対話から除外します。それは歓迎的な行いではありません。「ハラスメント」という用語は、市民行動規範の定義を含むものと解釈します。その概念に何が含まれているのか明確でない場合は、その定義を読んでください。特に、社会的に疎外された人々を排除する行動は容認しません。
    個人的なハラスメントも容認されません。誰であっても、あなたがコミュニティメンバーにハラスメントを受けているか、または不快にさせられていると感じた場合は、ただちにチャンネル担当者または Rustモデレーションチーム のいずれかに連絡してください。あなたが常連の寄稿者であろうと、新規参入者であろうと、私たちはこのコミュニティをあなたにとって安全な場所にすることに気を配っています。あなたには私たちがついています。
    同様に、いかなるスパム、荒らし行為、感情的な言動、釣り行為、その他の注意を反らす行為も歓迎されるものではありません。`);
  },

  kokoro() {
    morpheme.rawText
      .set(`私はその人を常に先生と呼んでいた。だからここでもただ先生と書くだけで本名は打ち明けない。これは世間を憚かる遠慮というよりも、その方が私にとって自然だからである。私はその人の記憶を呼び起すごとに、すぐ「先生」といいたくなる。筆を執っても心持は同じ事である。よそよそしい頭文字などはとても使う気にならない。
    私が先生と知り合いになったのは鎌倉である。その時私はまだ若々しい書生であった。暑中休暇を利用して海水浴に行った友達からぜひ来いという端書を受け取ったので、私は多少の金を工面して、出掛ける事にした。私は金の工面に二、三日を費やした。ところが私が鎌倉に着いて三日と経たないうちに、私を呼び寄せた友達は、急に国元から帰れという電報を受け取った。電報には母が病気だからと断ってあったけれども友達はそれを信じなかった。友達はかねてから国元にいる親たちに勧まない結婚を強いられていた。彼は現代の習慣からいうと結婚するにはあまり年が若過ぎた。それに肝心の当人が気に入らなかった。それで夏休みに当然帰るべきところを、わざと避けて東京の近くで遊んでいたのである。彼は電報を私に見せてどうしようと相談をした。私にはどうしていいか分らなかった。けれども実際彼の母が病気であるとすれば彼は固より帰るべきはずであった。それで彼はとうとう帰る事になった。せっかく来た私は一人取り残された。
    学校の授業が始まるにはまだ大分日数があるので鎌倉におってもよし、帰ってもよいという境遇にいた私は、当分元の宿に留まる覚悟をした。友達は中国のある資産家の息子で金に不自由のない男であったけれども、学校が学校なのと年が年なので、生活の程度は私とそう変りもしなかった。したがって一人ぼっちになった私は別に恰好な宿を探す面倒ももたなかったのである。
    宿は鎌倉でも辺鄙な方角にあった。玉突きだのアイスクリームだのというハイカラなものには長い畷を一つ越さなければ手が届かなかった。車で行っても二十銭は取られた。けれども個人の別荘はそこここにいくつでも建てられていた。それに海へはごく近いので海水浴をやるには至極便利な地位を占めていた。
    私は毎日海へはいりに出掛けた。古い燻ぶり返った藁葺の間を通り抜けて磯へ下りると、この辺にこれほどの都会人種が住んでいるかと思うほど、避暑に来た男や女で砂の上が動いていた。ある時は海の中が銭湯のように黒い頭でごちゃごちゃしている事もあった。その中に知った人を一人ももたない私も、こういう賑やかな景色の中に裹まれて、砂の上に寝そべってみたり、膝頭を波に打たしてそこいらを跳ね廻るのは愉快であった。
    私は実に先生をこの雑沓の間に見付け出したのである。その時海岸には掛茶屋が二軒あった。私はふとした機会からその一軒の方に行き慣れていた。長谷辺に大きな別荘を構えている人と違って、各自に専有の着換場を拵えていないここいらの避暑客には、ぜひともこうした共同着換所といった風なものが必要なのであった。彼らはここで茶を飲み、ここで休息する外に、ここで海水着を洗濯させたり、ここで鹹はゆい身体を清めたり、ここへ帽子や傘を預けたりするのである。海水着を持たない私にも持物を盗まれる恐れはあったので、私は海へはいるたびにその茶屋へ一切を脱ぎ棄てる事にしていた。`);
  },

  見出し強調機能() {
    morpheme.rawText.set(`物理的消化
      咀嚼
        食物を歯で噛み砕く事によって食物を細かくする。
      蠕動運動
        筋肉の収縮で波を作り、食物を運ぶ。
      分節運動
        筋肉の収縮によって消化液と食物を混ぜる。`);
  },

  長いカタカナ文() {
    morpheme.rawText.set(
      `クラウドファンディングサイトで新しいエキストラホイップモカカプチーノ開発のスペシャルオファーがウィトゲンシュタインさんから届きました。`
    );
  },

  自動折り返しされない文() {
    morpheme.rawText.set(
      `0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde0123456789abcde`
    );
  },
});
