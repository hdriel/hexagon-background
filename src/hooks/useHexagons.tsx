import classNames from 'classnames';

export function useHexagons({
    width,
    height,
    hoverEffect,
    backgroundColor,
    borderColor,
}: {
    width: number;
    height: number;
    hoverEffect?: boolean;
    backgroundColor?: string | boolean;
    borderColor?: string | boolean;
}): any {
    const hexagonInRow = width ? parseInt(String(width / 85), 10) : 0;
    const hexagonInCol = height ? parseInt(String(height / 75), 10) : 0;

    const hexagonClass = classNames({
        hexagon: true,
        'hexagon-hover': hoverEffect,
        background: backgroundColor,
        colorful: !borderColor,
    });

    return hexagonInCol && hexagonInRow
        ? Array.from(new Array(hexagonInCol), (_hc, hci) => (
              <div className="hexagon-row" key={`hexagon-row-${hci}`}>
                  {Array.from(new Array(hexagonInRow), (_hr, hri) => (
                      <div className={hexagonClass} key={`hexagon-row-${hri}`} />
                  ))}
              </div>
          ))
        : null;
}
