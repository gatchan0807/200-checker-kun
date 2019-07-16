# これはなに？

## ツール名
200チェッカーくん

## 用途

Webサイト・Webアプリケーションのエラー有無を簡易テストするための使用を想定しています。

サイトのURLをCSVファイルにまとめて置くことで、自動でそのURLに対してChromium（≒Chrome）ブラウザでアクセスし、CSVファイルにレポートを出力されるので、400/500エラーが発生していないかを簡単に確認することが可能です。

また、アクセスと同時に画面をスクリーンショットを撮影する機能もあるので、各画面の状態をあとから確認することも可能です。

# 使い方（エンジニア向け）

## 使用技術

- Puppeteer ( https://github.com/GoogleChrome/puppeteer )

## 手順

Gitクローン、Node.jsのインストールは省略

1. ```$ npm install```
2. ```$ npm start```

スマートフォン(iPhone X)でページにアクセスした情報がレポーティングされます

### アクセスするリンクの変更

`master` ディレクトリ内の `links.csv` ファイルの中を変更することで変更できます。下記の組み合わせでデータを作成してください。
ファイル名は現在 [ここ](https://github.com/gatchan0807/200-checker-kun/blob/20e39183ba998846353b6c883a7f6e407730a8a1/index.js#L15) で指定されています

```csv
[ページ名等 識別用のテキスト],[URL]
```

## レポーティングバリエーション

基本的には[npmスクリプト](https://github.com/gatchan0807/200-checker-kun/blob/20e39183ba998846353b6c883a7f6e407730a8a1/package.json#L6-L18)で設定されているバリエーションを使うことができます。

コマンドライン引数のオプションは[ここ](https://github.com/gatchan0807/200-checker-kun/blob/20e39183ba998846353b6c883a7f6e407730a8a1/src/emulatePatternList.js#L2-L22)で設定し、マッピングされています。

選択できるデバイスは[Puppeteerで選択できるデバイス](https://github.com/GoogleChrome/puppeteer/blob/master/lib/DeviceDescriptors.js)のみで、上記のデバイスの`name`をもとにマッピングしています。

```
npm start # => デフォルトのiPhone Xでスクリーンショット無しアクセステスト。
npm run test:e2e:all # => 下記全てのデバイスでスクリーンショット無しアクセステスト。
npm run test:e2e # => iPhone Xでスクリーンショット無しアクセステスト。
npm run test:e2e:android # => Nexus 6でスクリーンショット無しアクセステスト。
npm run test:e2e:iphone:se # => iPhone SEでスクリーンショット無しアクセステスト。
npm run test:e2e:pc # => PC(Laptop View)でスクリーンショット無しアクセステスト。
npm run test:image:all # => 下記全てのデバイスでスクリーンショット有りアクセステスト。
npm run test:image # => iPhone Xでスクリーンショット有りアクセステスト。
npm run test:image:android # => Nexus 6でスクリーンショット有りアクセステスト。
npm run test:image:iphone:se # => iPhone SEでスクリーンショット有りアクセステスト。
npm run test:image:pc # => PC(Laptop View)でスクリーンショット有りアクセステスト。
```

# 結果の確認方法（全ユーザー対象）

## レポート

アクセスしたレポートは `result` フォルダ内に作成されます。

ファイル名は `result-[実行日時].csv` で出力されます。

1レコードの見方は

```
[ページ名等識別用のテキスト],[アクセス結果（HTTPステータスコード）],[URL]
```

です。

## スクリーンショット

アクセス時のスクリーンショットは `screenshot` フォルダ内に作成されます。

※現状ツールの仕様上、稀に真っ白な画像が生成される場合があります。こちら対応中なので、しばらくお待ち下さい