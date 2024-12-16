import React from 'react';
import type { PropsWithChildren } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { getHexagonItems } from './hexagon.utils.tsx';

interface HexagonBackgroundLayoutProps {
    style?: any;
    resize?: boolean;
}

const HexagonBackground: React.FC<PropsWithChildren<HexagonBackgroundLayoutProps>> = ({
    children,
    style,
    resize = true,
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(resize);
    const hexagons = getHexagonItems({ width, height });

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
