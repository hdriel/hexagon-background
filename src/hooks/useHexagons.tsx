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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const hexagonStyle: Record<string, string> = { ...(varColor && { '--hexagon-color': varColor }) };

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
                      <div key={`hexagon-row-${hci}-${hri}`} className={hexagonClass} style={hexagonStyle} />
                  ))}
              </div>
          ))
        : null;
}
