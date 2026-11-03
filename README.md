# 木更津高専ロボット研究同好会HP

Jekyll で構成した GitHub Pages 向けのサイトです。公開、ローカル確認、記事更新のすべてを GitHub ベースで完結できるようにしています。

## ローカルで確認する

1. Ruby 4.0を使用する（macOS標準のRuby 2.6は対象外）

   Apple Silicon MacでHomebrewを使う場合:

   ```bash
   brew install ruby
   export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
   rehash
   ruby -v
   ```

   `ruby -v`が4.0系であることを確認してください。継続して使用する場合はPATHの行を`~/.zshrc`にも設定します。Rubyの管理ツールを使う場合は`.ruby-version`を参照してください。
2. 依存関係を入れる

   ```bash
   bundle install
   ```

3. ローカルサーバを起動する

   ```bash
   bundle exec jekyll serve --livereload
   ```

4. ブラウザで `http://127.0.0.1:4000` を開く

### 生成済みのページを確認する

`_site` にビルド済みのページがある場合は、Rubyを起動せずに確認できます。リポジトリのフォルダで次を実行してください。

```bash
python3 -m http.server 4000 --bind 127.0.0.1 --directory _site
```

ブラウザで <http://127.0.0.1:4000/> を開きます。同じポートのサーバーがすでに動いている場合は、起動せずにそのURLを開いてください。終了するときは、起動したターミナルで `Ctrl+C` を押します。

これは生成済みのページを表示する方法です。ソースを編集した場合は、先に `bundle exec jekyll build` で再生成してください。自動更新しながら編集する場合は、上の `jekyll serve --livereload` を使います。`127.0.0.1` は同じパソコンから確認するためのアドレスです。

## GitHub Pages で公開する

このリポジトリには GitHub Actions 用の [`pages.yml`](./.github/workflows/pages.yml) を含めています。

1. GitHub の `Settings > Pages` を開く
2. `Build and deployment` の `Source` を `GitHub Actions` にする
3. `main` ブランチへ反映すると、自動でビルドと公開が走る

公開先 URL:
<https://nitkcrbkn.github.io/>

## 記事を追加する方法

### 一番簡単な方法: Pages CMS を使う

このリポジトリには [Pages CMS](https://pagescms.org/) 用の [`.pages.yml`](./.pages.yml) を追加しています。

1. <https://app.pagescms.org/> にアクセス
2. GitHub でログイン
3. `nitkcrbkn/nitkcrbkn.github.io` を選ぶ
4. `記事` または `ロボ紹介` を開く
5. フォームに沿って入力し、保存する

Markdown や Git を知らなくても、ブラウザ上のフォームから投稿できます。

ロゴを差し替える場合は `サイト設定` からロゴ画像を変更するか、[`_data/site.yml`](./_data/site.yml) の `branding.logo_black` / `branding.logo_white` を更新してください。画像ファイル自体を差し替える場合は [`assets/images/club-logo-black.svg`](./assets/images/club-logo-black.svg) と [`assets/images/club-logo-white.svg`](./assets/images/club-logo-white.svg) を置き換えます。

### 手動で追加する

記事は `_posts` 配下の Markdown で管理します。

```md
---
title: "記事タイトル"
date: 2026-03-23
summary: "一覧に出す短い説明"
published: true
---
ここに本文を書きます。
```

ロボ紹介は `_robots` 配下の Markdown です。

```md
---
title: "機体名"
year: 2026
team: "Aチーム"
award: "受賞・実績"
overview: "機体の概要"
image: "/assets/images/uploads/sample.jpg"
image_width: 1200
image_height: 800
image_alt: "競技中のロボットの様子"
image_caption: "撮影した大会名・日付など"
published: true
---
ここに詳細を書きます。
```

写真の `image_width` と `image_height` には元画像のピクセル数を入力してください。画像の読み込み中も表示領域を確保し、レイアウトのずれを抑えます。機体写真がない場合は `image` を省略できます。記事一覧にも、同じ3項目（`image`・`image_width`・`image_height`）で写真を設定できます。

2025年の機体写真は、本文で参照している木更津高専公式ニュース「地区大会参加報告」の掲載写真をWebPに変換したものです。出典URLは `_data/site.yml` の `photos.district_2025` と各機体の `image_source` に記載し、写真の下から参照できます。展示・操縦体験とSTM32の記事写真は、既存の画像を軽量化しています。

## 編集しやすい場所

- サイト全体の基本情報: `_data/site.yml`
- ナビゲーション: `_data/navigation.yml`
- 記事: `_posts/`
- ロボ紹介: `_robots/`
- お問い合わせページ本文: `contact.md`
- ロゴ設定: `_data/site.yml` の `branding.logo_black` / `branding.logo_white`
- ロゴ画像ファイル: `assets/images/club-logo-black.svg`, `assets/images/club-logo-white.svg`

### 記事と機体紹介の表示設定

- 記事の `category` は活動報告一覧の絞り込みに使います（大会、展示・体験、ご支援、メディア掲載、お知らせ）。未設定の記事は「お知らせ」と表示します。
- `featured: true` の記事を一覧の冒頭で大きく表示します。複数ある場合は最新の1件です。
- 記事の `robots` に機体のファイル名（拡張子なし）を配列で指定すると、記事と機体詳細の両方に関連リンクが表示されます。例：`robots: [2025-soreyuke-kisantaclaus]`。
- 機体の `overview` は一覧用の短い特徴、`competition` は競技テーマ、`award` は実績です。本文には機構と大会の記録を記載します。本文内の見出しは `###` から始めます。
- 過去の告知に `historical_notice: true` を設定すると、掲載当時の情報であることを表示します。
- `title_parts` は長い見出しの自然な折り返し位置を指定する任意の配列です。連結した文字列が `title` と異なる場合は無視されるため、タイトルを変更しても古い文言は表示されません。
- 写真がない記事・機体も表示できます。代わりに無関係な画像を設定する必要はありません。
- 全ページの改善方針・確認結果は `_reports/site-design-2026-10.md` に記載しています。

### トップの写真

トップには、木更津高専公式の学生取材記事に掲載された高専ロボコン2024関東甲信越地区大会の写真を使用しています。画像は `assets/images/robots/2024/kisapen/competition.webp`、出典URL・代替テキスト・説明は `index.html` 冒頭の `hero_image_*` に設定しています。元画像は700×466pxです。写真の内容は変えずWebPへ変換し、表示時のトリミングとタイトルの背景処理はCSSで行っています。


## ロボットの写真を追加する

編集ツールは [Pages CMS](https://app.pagescms.org/) です。このリポジトリを選び、「ロボ紹介」から機体を開きます。

- 「代表写真」は一覧と詳細ページの先頭に表示されます。
- 「追加の写真」で項目を追加し、写真と代替テキストを入力します。説明や出典は必要に応じて入力してください。
- 追加の写真はリストの順に詳細ページの「写真」欄に表示されます。項目を並べ替えると表示順も変わります。
- 幅・高さは元画像のピクセル数です。分からなければ空欄にできます。写真は縦横比を保って表示され、クリックすると元画像を開きます。
- 追加の写真が0枚なら写真欄は表示されません。従来の代表写真だけの機体もそのまま表示されます。

Markdownを直接編集する場合は、front matterに次のように記述します。

```yaml
gallery:
  - image: /assets/images/uploads/robot-side.jpg
    alt: ロボットの側面とアーム
    caption: アームを展開した状態
    width: 1200
    height: 800
    source_url: https://example.com/photo-source
    source_label: 写真の出典
```

パスや説明は実際の写真に置き換えてください。Pages CMSでの保存はリポジトリへの変更になります。


### Pages CMSで画像を選べない場合

メディアの管理範囲は `assets/images` 全体です。`uploads`、`robots` 内の写真やロゴも選択でき、公開パスは `/assets/images/...` として保存されます。
以前の設定は `assets/images/uploads` のみを対象としていたため、その外の既存画像を扱えませんでした。
Pages CMSはGitHub上の選択中のブランチを参照します。ローカルで追加した写真や `.pages.yml` の変更は、同じブランチへコミット・pushしてからCMSを再読み込みしてください。


### 機体写真のフォルダと改名

機体写真は `assets/images/robots/年度/機体名/` に保存します。現在は `2024/kisapen`、`2025/kisantaclaus`、`2025/octo` です。写真の撮影年ではなく、機体が出場した年度でまとめます。例えば2025年の展示で撮影した2024年の機体写真も `2024/kisapen/exhibition.webp` に置きます。

画像の移動・改名をすると公開URLも変わります。画像ファイルだけを改名せず、参照する `image`、`gallery`、記事本文の画像パス、トップページやテンプレートも一緒に更新してください。同じ写真を複数のページで使っている場合は全てが対象です。Pages CMSでの改名でも、記事内の参照が自動更新されるとは想定せず、参照先を確認・再選択してください。公開済みの画像URLを維持したい場合は、元のファイルを残します。


## Ruby 4.0とGitHub Pages

ローカルとGitHub ActionsでRuby 4.0を使用します。Jekyllは既存サイトの3.10系を維持し、`github-pages` gem一式ではなく必要な依存関係をGemfileで指定しています。Ruby 4.0で標準添付されないライブラリも明示しています。

GitHubのリポジトリ設定で **Settings → Pages → Build and deployment → Source → GitHub Actions** を選択してください。`.github/workflows/pages.yml`がRuby 4.0でビルドし、生成された`_site`を公開します。GitHub標準のJekyllビルドアクションは使用しません。Pages CMSによるmainブランチへの保存も、このワークフローを起動します。

依存関係は`Gemfile.lock`を含めてコミットしてください。通常のセットアップでは`bundle install`を使用し、依存関係を更新する意図がある場合だけ`bundle update`を実行します。


### 写真の解像度と表示サイズ

ロボットの代表写真・一覧写真・追加写真は3:2の共通枠に、画像全体を収めて表示します。縦長・正方形の画像では周囲に余白が付きます。元画像のピクセル幅によってページのカラム幅が変わることはありません。小さい写真を使ってもレイアウトは揃いますが、拡大時の精細さは元画像に依存します。

写真を差し替えたときは、代替テキスト・キャプションも確認してください。`image_width` / `image_height`や追加写真の`width` / `height`は実際のピクセル数を記入します。


### 記事の視点

活動報告・機体紹介は、ロボ研自身が活動や製作について伝える一次ソースとして書きます。「学校のお知らせによると」「紹介記事では」「特徴として紹介されています」のように、別の記事の説明を代弁する書き方は使いません。自分たちが何を作り、何を行い、どの結果を得たかを直接書きます。取材・新聞掲載の事実、写真の出典、関連リンクはその役割に応じて記載し、予定・感想・未確認事項は事実と混同しないようにします。


### トップのスライド写真

`_data/hero_slides.yml`の順に写真を表示します。Pages CMSの「トップの写真」でも編集できます。各写真の`image`・`alt`・`caption`・`source_url`・`source_label`を登録します。トップの`index.html`の`image`はSNS共有用の代表画像として残しています。

2枚以上なら6秒ごとに切り替わり、写真上に切替用のドットを表示します。マウスを写真や操作欄に重ねた間、キーボードフォーカスがある間、タブを非表示にした間は切替を休止します。動きを減らす設定では自動再生を開始しません。JavaScript無効時は最初の写真を表示します。
