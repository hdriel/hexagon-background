import React from 'react';
import type { PropsWithChildren } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { getHexagonItems } from './hexagon.utils.tsx';
import { useHexagonSpotlight } from '../hooks/useHexagonSpotlight';

interface HexagonBackgroundLayoutProps {
    style?: any;
    resize?: boolean;
    hoverEffect?: boolean;
    spotLightEffect?: boolean;
}

const HexagonBackground: React.FC<PropsWithChildren<HexagonBackgroundLayoutProps>> = ({
    children,
    style,
    resize = true,
    hoverEffect = false,
    spotLightEffect = true,
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(resize);
    const hexagons = getHexagonItems({ width, height, hoverEffect });
    const lightElement = useHexagonSpotlight(ref);

    return (
        <div ref={ref} className="hexagon-container">
            <div className="hexagon-content" style={style}>
                {children}
            </div>
            {spotLightEffect && lightElement}
            {hexagons}
        </div>
    );
};

export default HexagonBackground;
