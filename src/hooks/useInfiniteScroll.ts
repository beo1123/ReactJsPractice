import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
    containerRef: React.RefObject<HTMLElement | null>,
    callback: () => void,
    loadingMore: boolean,
    hasMore: boolean,

    options?: { offset?: number }) => {
    const offset = options?.offset ?? 100;
    const calledRef = useRef(false);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (!hasMore) return;

            const { scrollTop, scrollHeight, clientHeight } = el;
            const reachedBottom = scrollTop + clientHeight >= scrollHeight - offset;
            if (reachedBottom && !calledRef.current) {
                calledRef.current = true;
                callback();
            }


        }

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, [containerRef, callback, offset, loadingMore, hasMore]);

    useEffect(() => {
        if (!loadingMore) {
            calledRef.current = false;
        }
    }, [loadingMore]);
}