# Green Graph

A React component that displays GitHub contribution graphs in your web application.

## Installation

```bash
npm install green-graph
```

## Usage

```jsx
import ContributionGraph from "green-graph";

function App() {
  return (
    <ContributionGraph
      username="your-github-username"
      token="your-github-personal-access-token"
    />
  );
}
```

## Props

| Prop        | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `username`  | string | Yes      | GitHub username to fetch contributions for          |
| `token`     | string | Yes      | GitHub personal access token for API authentication |

### Custom Colors Example

```jsx
const customColors = {
  0: "#ebedf0", // No contributions
  1: "#c6e48b", // 1-3 contributions
  2: "#7bc96f", // 4-6 contributions
  5: "#239a3b", // 7-9 contributions
  10: "#196127", // 10+ contributions
};

<ContributionGraph
  username="your-username"
  token="your-token"
/>;
```

## GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `read:user` and `repo` scopes
3. Use this token in the `token` prop

## Features

- ✅ Real-time GitHub contribution data
- ✅ Loading and error states
- ✅ TypeScript support
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Tooltip on hover
- ✅ Total contribution count

## To be added

- ✅ Customizable colors
- ✅ Responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
