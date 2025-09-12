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
