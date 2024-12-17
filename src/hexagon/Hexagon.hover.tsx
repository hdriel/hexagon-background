import React, { type CSSProperties } from 'react';
import type { PropsWithChildren } from 'react';
import { isMobile } from 'react-device-detect';

import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize.ts';
import { useHexagons } from '../hooks/useHexagons';
import classNames from 'classnames';

interface HexagonHoverProps {
    style?: CSSProperties;
    resize?: boolean;
    color?: string;
    filled?: string | boolean;
    theme?: 'dark' | 'light';
}

const HexagonHover: React.FC<PropsWithChildren<HexagonHoverProps>> = ({
    children,
    style,
    resize = true,
    color,
    filled,
    theme = 'dark',
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(!isMobile && resize);
    const hexagons = useHexagons({ width, height, color, filled, hoverEffect: true });

    const hexagonClass = classNames({
        'hexagon-container': true,
        dark: theme === 'dark',
        light: theme === 'light',
    });

    return (
        <div ref={ref} className={hexagonClass}>
            <div className="hexagon-content" style={style}>
                {children}
            </div>
            {hexagons}
        </div>
    );
};

export default HexagonHover;
