import { ReactElement } from 'react';
import classNames from 'classnames';

export function useHexagons({
    width,
    height,
    hoverEffect,
    color,
    filled,
}: {
    width: number;
    height: number;
    hoverEffect?: boolean;
    color?: string | boolean;
    filled?: string | boolean;
}): null | ReactElement[] {
    const hexagonInRow = width ? parseInt(String(width / 85), 10) : 0;
    const hexagonInCol = height ? parseInt(String(height / 75), 10) : 0;
    const varColor = (hoverEffect && color) || '#00FF00';
    const hexagonClass = classNames({
        hexagon: true,
        filled: filled,
        colorized: !color,
        'hexagon-hover': hoverEffect,
    });

    return hexagonInCol && hexagonInRow
        ? Array.from(new Array(hexagonInCol), (_hc, hci) => (
              <div key={`hexagon-row-${hci}`} className="hexagon-row">
                  {Array.from(new Array(hexagonInRow), (_hr, hri) => (
                      <div
                          key={`hexagon-row-${hci}-${hri}`}
                          className={hexagonClass}
                          style={{ '--hexagon-color': varColor }}
                      />
                  ))}
              </div>
          ))
        : null;
}
