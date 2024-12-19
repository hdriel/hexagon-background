Background Hexagon Effects

[Live Demo](https://hdriel.github.io/hexagon-background/)


# Hexagon Background Effects

This project provides reusable React components that add a stylish hexagon background effect to your application. You can wrap your content with these components to display hexagonal patterns with three distinct hover effects:

1. **Filled Hexagon Hover**: The hexagons fill with color when hovered.
2. **Border Hexagon Hover**: The borders of the hexagons highlight when hovered.
3. **Spotlight Hexagon Hover**: A spotlight effect focuses on the hovered hexagon.

## Features
- Easy-to-use React components.
- Customizable colors and effects.
- Lightweight and responsive design.

## Installation

Install the package using npm or yarn:

```bash
npm install hexagon-background
```

or

```bash
yarn add hexagon-background
```

## Usage

Wrap your components with the desired hexagon background effect:

### Example: Filled Hexagon Hover
```jsx
import { HexagonHover } from 'hexagon-background';

function App() {
  return (
    <HexagonHover filled>
      <div>Your Content Here</div>
    </HexagonHover>
  );
}
```

### Example: Border Hexagon Hover
```jsx
import { HexagonHover } from 'hexagon-background';

function App() {
    return (
        <HexagonHover>
            <div>Your Content Here</div>
        </HexagonHover>
    );
}
```

### Example: Spotlight Hexagon Hover
```jsx
import { HexagonSpotlight } from 'hexagon-background';

function App() {
    return (
        <HexagonSpotlight>
            <div>Your Content Here</div>
        </HexagonSpotlight>
    );
}
```

## Customization

You can customize the colors and sizes of the hexagons by passing props to the components:

```jsx
<HexagonSpotlight color="#3498db" size={50}>
  <div>Your Content Here</div>
</HexagonSpotlight>
```

| Prop  | Description                 | Default         |
|-------|-----------------------------|-----------------|
| theme | theme of hexagon background | `dark`          |
| color | The color of the hexagons   | `#cccccc`       |
| size  | Size of spotline hexagon    | `40px` (pixels) |

## Demo

Check out the live demo on GitHub Pages: [Hexagon Background Effects Demo](https://hdriel.github.io/hexagon-background/)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy creating stunning hexagon backgrounds!

