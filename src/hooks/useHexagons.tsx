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

    const hexagonStyle: Record<string, string> = {
        ...(varColor && typeof varColor === 'string' && { '--hexagon-color': varColor }),
    };

    const hexagonClass = classNames({
        hexagon: true,
        filled: filled,
        colorized: !color || (typeof color === 'boolean' && color),
        'hexagon-hover': hoverEffect,
    });

    console.log('hexagonClass', hexagonClass);

    return hexagonInCol && hexagonInRow
        ? Array.from(new Array(hexagonInCol), (_hc, hci) => (
              <div key={`hexagon-row-${hci}`} className="hexagon-row">
                  {Array.from(new Array(hexagonInRow), (_hr, hri) => (
                      <div key={`hexagon-row-${hci}-${hri}`} className={hexagonClass} style={hexagonStyle} />
                  ))}
              </div>
          ))
        : null;
}
