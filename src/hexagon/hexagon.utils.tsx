export const getHexagonItems = ({ width, height }: { width: number; height: number }) => {
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
