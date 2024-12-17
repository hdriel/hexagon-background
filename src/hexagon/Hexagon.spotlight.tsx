import React, { type CSSProperties } from 'react';
import type { PropsWithChildren } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { useHexagonSpotlight } from '../hooks/useHexagonSpotlight';
import { useHexagons } from '../hooks/useHexagons';

interface HexagonSpotlightProps {
    style?: CSSProperties;
    resize?: boolean;
    color?: string;
}

const HexagonSpotlight: React.FC<PropsWithChildren<HexagonSpotlightProps>> = ({
    children,
    style,
    resize = true,
    color,
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(resize);
    const hexagons = useHexagons({ width, height, color, filled: false, hoverEffect: false });
    const lightElement = useHexagonSpotlight(ref);

    return (
        <div ref={ref} className="hexagon-container">
            <div className="hexagon-content" style={style}>
                {children}
            </div>
            {lightElement}
            {hexagons}
        </div>
    );
};

export default HexagonSpotlight;
