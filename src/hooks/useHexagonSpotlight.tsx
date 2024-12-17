import { useLayoutEffect, useRef } from 'react';

export const useHexagonSpotlight = (containerRef: any) => {
    const spotlightRef = useRef<HTMLDivElement>(null);

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
            containerRef.current.removeEventListener('mousemove', mouseMoveCB);
        };
    }, [spotlightRef.current]);

    return <div ref={spotlightRef} className="hexagon-cursor" />;
};
