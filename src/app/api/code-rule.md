# Api構造

## apiは以下の３で構成されています。
***書き方の例はsurvey/route.tsのGETを見てください。***

- route.ts   
以下のコードを書く。
    - リクエスト受け取り
    - Repository関数の呼び出し
    - レスポンスの返し

- Repository   
prisma処理の関数定義する。


# エラーハンドリング
- route.tsでtry-catch書いて、console.errorとstatus500を返す。
- Repositoryではtry-catchは基本的に書かない。

# zodバリデーション
api作成時には以下のzodスキーマを作成してください。   
***レスポンスのスキーマは全api必須***
- クエリパラメーター
- パスパラメーター
- リクエストボディー
- レスポンス

<br>

## 基本的なディレクトリー構造
```
src/
└── app/
    └── api/
        ├── (Repository)/
        │   └── survey.ts
        ├── auth/
        │   └── [...auth]/
        │       └── route.ts
        ├── code-rule.md
        ├── lib.ts
        └── survey/
            ├── [id]/
            │   └── route.ts
            └── route.ts
└── schema/
    └── api/
        └── survey.ts
└── types/
    └── api/
        ├── index.ts
        └── survey.ts
```


