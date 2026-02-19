# CodeBlock

CodeBlock is an optional component powered by <code>react-syntax-highlighter</code>. Install the peer dependency to use it.

## Example

### Syntax Highlighting

```tsx
<CodeBlock
  code={`const total = prices.reduce((acc, price) => acc + price, 0)`}
  language="javascript"
/>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| code | string | "" | Source code content to render. |
| language | string | "tsx" | Syntax language identifier. |
| theme | "auto" \| "light" \| "dark" | "auto" | Highlight theme mode. |
| showLineNumbers | boolean | false | Shows line numbers. |
| wrapLongLines | boolean | true | Wraps long lines. |
