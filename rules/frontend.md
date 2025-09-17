フロントエンドのコード規約です
必ずこのルールに従ってコードを書いてください

## コード規約

- 必ず arrow function を使用してください。その際propsの使用方法について以下に必ず従ってください。
```tsx

interface ExampleComponentProps {
  name: string;
  age: number;
}

const ExampleComponent:React.FC<ExampleComponentProps> = (props) => {
  return <div>{props.name}</div>;
};
```

- 必ずデータフェッチにはuseSWRを使用してください。

- 必ずフォームを作成する場合はReact Hook FormとShadcnを組み合わせて作成してください。React Hook FormではZodResolverを使用してください。

- ロジック層をカスタムフックに分離してください。

