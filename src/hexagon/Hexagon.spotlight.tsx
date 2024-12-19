import React from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import './hexagon.scss';
import { useElementSize } from '../hooks/useElementSize';
import { useHexagonSpotlight } from '../hooks/useHexagonSpotlight';
import { useHexagons } from '../hooks/useHexagons';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

interface HexagonSpotlightProps {
    style?: CSSProperties;
    resize?: boolean;
    color?: string;
    size?: string;
    theme?: 'dark' | 'light';
}

const HexagonSpotlight: React.FC<PropsWithChildren<HexagonSpotlightProps>> = ({
    children,
    style,
    resize = true,
    color,
    size,
    theme = 'dark',
}): React.ReactElement => {
    const [ref, { width, height }] = useElementSize(!isMobile && resize);
    const hexagons = useHexagons({ width, height, color, filled: false, hoverEffect: false });
    const lightElement = useHexagonSpotlight(ref, { size, color });

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
            {lightElement}
            {hexagons}
        </div>
    );
};

export default HexagonSpotlight;
