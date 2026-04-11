"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { useScrollPersistence } from "@/hooks/use-scroll-persistence";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { containerRef, handleScroll } = useScrollPersistence("dashboard-main");
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar - Width handled by state */}
            <Sidebar isCollapsed={isCollapsed} />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Topbar - Receives toggle function */}
                <Topbar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

                <main
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-8 bg-[#090e23] scroll-smooth"
                >
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
