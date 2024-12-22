import React from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { useElementSize } from '../hooks/useElementSize';
import { useHexagons } from '../hooks/useHexagons';
import './hexagon.scss';

interface HexagonHoverProps {
    style?: CSSProperties;
    resize?: boolean;
    color?: string | boolean;
    filled?: string | boolean;
    theme?: 'dark' | 'light';
}

const HexagonHover: React.FC<PropsWithChildren<HexagonHoverProps>> = ({
    children,
    style,
    color,
    resize = true,
    filled = false,
    theme = 'dark',
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(!isMobile && resize);

    const hexagons = useHexagons({
        width,
        height,
        color,
        filled,
        hoverEffect: true,
    });

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
