"use client";

import { useEffect, useRef } from "react";

export function useScrollPersistence(key: string) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Restore scroll on mount
    useEffect(() => {
        const savedPosition = sessionStorage.getItem(`scroll-${key}`);
        if (savedPosition && containerRef.current) {
            containerRef.current.scrollTop = parseInt(savedPosition, 10);
        }
    }, [key]);
    // Save scroll on change
    const handleScroll = () => {
        if (containerRef.current) {
            sessionStorage.setItem(`scroll-${key}`, containerRef.current.scrollTop.toString());
        }
    };
    return { containerRef, handleScroll };
}