# 初期設定の手順

## 依存関係のインストール

```
npm i
```



## .envの作成と設定

```
cp .env.example .env
```



## ローカルDB起動

```
docker compose up -d
```

## テーブルをDBに反映させる

```
npx prisma migrate dev
```

## サーバー起動

```
npm run dev
```

## prisma Studio

```
npx prisma studio
```



# コミット時にエラーが出た場合

コミット時にbiome check（formatとlintの確認）とtypecheck（型エラーの確認）をしています。

- biome checkでエラーが出た場合は以下のコマンドを実行して、再度コミットしてください。
- typecheckでエラーが出た場合は型エラーを直してから、再度add, commitしてください。

```
npm run  format
```
