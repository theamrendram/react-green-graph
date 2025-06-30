# React Green Graph

A React component that displays GitHub contribution graphs in your web application with customizable color themes.

## Installation

```bash
npm install @theamrendram/react-green-graph
```

## Usage

### Basic Usage

```jsx
import ReactGreenGraph from "@theamrendram/react-green-graph";

function App() {
  return (
    <ReactGreenGraph
      username="your-github-username"
      token="your-github-personal-access-token"
    />
  );
}
```

### Custom Colors

You can customize the contribution graph colors by passing a `colors` prop with an array of 5 hex colors:

```jsx
import ReactGreenGraph from "@theamrendram/react-green-graph";

function App() {
  // Custom color array (5 colors)
  const customColors = [
    "#ebedf0", // No contributions
    "#c6e48b", // Light color for 1-3 contributions
    "#7bc96f", // Medium color for 4-6 contributions
    "#239a3b", // Dark color for 7-9 contributions
    "#196127", // Darkest color for 10+ contributions
  ];

  return (
    <ReactGreenGraph
      username="your-github-username"
      token="your-github-personal-access-token"
      colors={customColors}
    />
  );
}
```

### Color Theme Examples

#### Blue Theme

```jsx
const blueTheme = [
  "#ebedf0", // No contributions
  "#c6e48b", // Light blue
  "#7bc96f", // Medium blue
  "#239a3b", // Dark blue
  "#196127", // Darkest blue
];
```

#### Purple Theme

```jsx
const purpleTheme = [
  "#f0f0f0", // No contributions
  "#e1d5e7", // Light purple
  "#c3a4d7", // Medium purple
  "#9b59b6", // Dark purple
  "#8e44ad", // Darkest purple
];
```

#### Orange Theme

```jsx
const orangeTheme = [
  "#f8f9fa", // No contributions
  "#ffd8a8", // Light orange
  "#ffa94d", // Medium orange
  "#fd7e14", // Dark orange
  "#e8590c", // Darkest orange
];
```

## Props

| Prop       | Type     | Required | Description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| `username` | string   | Yes      | GitHub username to fetch contributions for          |
| `token`    | string   | Yes      | GitHub personal access token for API authentication |
| `colors`   | string[] | No       | Array of 5 hex colors for custom theme              |

### Color Array Format

The `colors` prop expects an array of exactly 5 hex color values:

1. **Index 0**: Color for no contributions
2. **Index 1**: Color for 1-3 contributions
3. **Index 2**: Color for 4-6 contributions
4. **Index 3**: Color for 7-9 contributions
5. **Index 4**: Color for 10+ contributions

## GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `read:user` and `repo` scopes
3. Use this token in the `token` prop

## Features

- ✅ Real-time GitHub contribution data
- ✅ Customizable color themes
- ✅ Loading and error states
- ✅ TypeScript support
- ✅ Accessible (ARIA labels, keyboard navigation)
- ✅ Tooltip on hover
- ✅ Total contribution count
- ✅ Automatic CSS injection
- ✅ PropTypes validation
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
