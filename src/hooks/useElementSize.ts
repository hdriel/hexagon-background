import { useDebouncedCallback } from 'use-debounce';
import { useState, useRef, useEffect, useCallback, type RefObject } from 'react';

export function useElementSize(resize = false): [RefObject<HTMLDivElement>, { width: number; height: number }] {
    const ref = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = useCallback(() => {
        if (ref.current) {
            const { width, height } = ref.current?.getBoundingClientRect() ?? {};
            setWidth(width);
            setHeight(height);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResizeDebounced = useDebouncedCallback(handleResize, 250);

    useEffect(() => {
        handleResizeDebounced?.();
    }, [handleResizeDebounced]);

    useEffect(() => {
        if (resize) {
            window.addEventListener('resize', handleResizeDebounced);
        }

        return () => {
            if (resize) window.removeEventListener('resize', handleResizeDebounced);
        };
    }, [handleResize, resize]);

    return [ref, { width, height }];
}
