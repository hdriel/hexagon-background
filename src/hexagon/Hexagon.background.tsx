import React from "react";
import type { PropsWithChildren } from "react";
import "./hexagon.scss";
import { useElementSize } from "../hooks/useElementSize.ts";

interface HexagonBackgroundLayoutProps {
  style?: any;
  resize?: boolean;
}

const getHexagons = (width: number, height: number) => {
  const hexagonInRow = width ? parseInt(String(width / 85), 10) : 0;
  const hexagonInCol = height ? parseInt(String(height / 75), 10) : 0;

  return hexagonInCol && hexagonInRow
    ? Array.from(new Array(hexagonInCol), (_hc, hci) => (
        <div className="hexagon-row" key={`hexagon-row-${hci}`}>
          {Array.from(new Array(hexagonInRow), (_hr, hri) => (
            <div className="hexagon" key={`hexagon-row-${hri}`} />
          ))}
        </div>
      ))
    : null;
};

const HexagonBackground: React.FC<
  PropsWithChildren<HexagonBackgroundLayoutProps>
> = ({ children, style, resize = true }): React.ReactElement => {
  const [ref, { width, height }] = useElementSize(resize);

  console.table({ width, height });
  const hexagons = getHexagons(width, height);

  return (
    <div ref={ref} className="hexagon-container">
      <div className="hexagon-content" style={style}>
        {children}
      </div>
      {hexagons}
    </div>
  );
};

export default HexagonBackground;
