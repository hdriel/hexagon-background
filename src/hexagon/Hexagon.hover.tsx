import React from 'react';
import type { PropsWithChildren } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { useHexagons } from '../hooks/useHexagons';

interface HexagonHoverProps {
    style?: any;
    resize?: boolean;
}

const HexagonHover: React.FC<PropsWithChildren<HexagonHoverProps>> = ({
    children,
    style,
    resize = true,
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(resize);
    const hexagons = useHexagons({ width, height, hoverEffect: true });

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
