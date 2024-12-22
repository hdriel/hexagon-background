import { type RefObject, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';

export const useHexagonSpotlight = (
    containerRef: RefObject<HTMLDivElement>,
    {
        color = undefined,
        // color = 'linear-gradient(90deg, #335BF4 0%, #2AE9C9 100%)',
        radius = 200,
    }: { color?: string; radius?: number } = {}
) => {
    radius = Math.max(radius, 60);

    const spotlightRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const varColor = color || '#00FF00';

    const hexagonStyle: Record<string, string> = {
        ...(varColor && typeof varColor === 'string' && { '--hexagon-cursor-color': varColor }),
        ...(radius && { '--hexagon-cursor-size': `${radius}px` }),
    };

    const hexagonClass = classNames({
        'hexagon-cursor': true,
        colorized: !color || (typeof color === 'boolean' && color),
    });

    useLayoutEffect(() => {
        if (!spotlightRef.current || !containerRef.current) return;

        const mouseMoveCB = (event: MouseEvent) => {
            if (spotlightRef.current) {
                spotlightRef.current.style.left = `${event.clientX}px`;
                spotlightRef.current.style.top = `${event.clientY}px`;
            }
        };
        containerRef.current.addEventListener('mousemove', mouseMoveCB);

        return () => {
            containerRef.current?.removeEventListener('mousemove', mouseMoveCB);
        };
    }, [spotlightRef.current]);

    return <div ref={spotlightRef} className={hexagonClass} style={hexagonStyle} />;
};
