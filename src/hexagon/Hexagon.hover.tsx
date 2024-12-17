import React, { type CSSProperties } from 'react';
import type { PropsWithChildren } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { useHexagons } from '../hooks/useHexagons';

interface HexagonHoverProps {
    style?: CSSProperties;
    resize?: boolean;
    color?: string;
    filled?: string | boolean;
}

const HexagonHover: React.FC<PropsWithChildren<HexagonHoverProps>> = ({
    children,
    style,
    resize = true,
    color,
    filled,
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(resize);
    const hexagons = useHexagons({ width, height, color, filled, hoverEffect: true });

    return (
        <div ref={ref} className="hexagon-container">
            <div className="hexagon-content" style={style}>
                {children}
            </div>
            {hexagons}
        </div>
    );
};

export default HexagonHover;
