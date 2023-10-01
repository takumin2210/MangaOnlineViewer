import { useEffect, useRef } from 'react';
import { useWindowScroll } from '@mantine/hooks';

export const isFixed = (current: number, fixedAt: number) => current <= fixedAt;
export const isPinned = (current: number, previous: number) => current <= previous;
export const isReleased = (current: number, previous: number, fixedAt: number) =>
  !isPinned(current, previous) && !isFixed(current, fixedAt);
export const isEnd = (current: number, fixedAt: number) =>
  current + window.innerHeight + fixedAt > document.body.scrollHeight;
interface UseHeadroomInput {
  /** Number in px at which element should be fixed */
  fixedAt?: number;

  /** Called when element is pinned */
  onPin?(): void;

  /** Called when element is at fixed position */
  onFix?(): void;

  /** Called when element is unpinned */
  onRelease?(): void;
}

export function useHeadroom({ fixedAt = 0, onPin, onFix, onRelease }: UseHeadroomInput = {}) {
  const scrollRef = useRef(0);
  const [{ y: scrollPosition }] = useWindowScroll();

  useEffect(() => {
    if (isPinned(scrollPosition, scrollRef.current)) {
      onPin?.();
    }
  }, [scrollPosition, onPin]);

  useEffect(() => {
    if (isFixed(scrollPosition, fixedAt)) {
      onFix?.();
    }
  }, [scrollPosition, fixedAt, onFix]);

  useEffect(() => {
    if (isReleased(scrollPosition, scrollRef.current, fixedAt)) {
      onRelease?.();
    }
  }, [scrollPosition, onRelease]);

  useEffect(() => {
    scrollRef.current = window.scrollY;
  }, [scrollPosition]);

  return (
    isPinned(scrollPosition, scrollRef.current) ||
    isFixed(scrollPosition, fixedAt) ||
    isEnd(scrollPosition, fixedAt)
  );
}
