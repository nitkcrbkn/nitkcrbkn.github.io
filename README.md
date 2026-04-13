# 木更津高専ロボット研究同好会HP

Jekyll で構成した GitHub Pages 向けのサイトです。公開、ローカル確認、記事更新のすべてを GitHub ベースで完結できるようにしています。

## ローカルで確認する

1. Ruby をインストールする  
   参考: <https://jekyllrb-ja.github.io/docs/installation/>
2. 依存関係を入れる

   ```bash
   bundle install
   ```

3. ローカルサーバを起動する

   ```bash
   bundle exec jekyll serve --livereload
   ```

4. ブラウザで `http://127.0.0.1:4000` を開く

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

ロゴを差し替える場合は `サイト設定` からロゴ画像を変更するか、[`assets/images/club-logo.svg`](./assets/images/club-logo.svg) を差し替えてください。

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
overview: "機体の概要"
image: "/assets/images/uploads/sample.jpg"
status: "制作中"
published: true
---
ここに詳細を書きます。
```

## 編集しやすい場所

- サイト全体の基本情報: `_data/site.yml`
- ナビゲーション: `_data/navigation.yml`
- 記事: `_posts/`
- ロボ紹介: `_robots/`
- お問い合わせページ本文: `contact.md`
- ロゴ画像: `assets/images/club-logo.svg`
