"use client";
import { usePathname } from "next/navigation";
import { Search, Bell, User, Menu, ChevronDown } from 'lucide-react';

interface TopbarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export function Topbar({ onToggle }: TopbarProps) {
    const pathname = usePathname();

    const sectionName = pathname.split('/').pop()?.replace(/^\w/, (c) =>
        c.toUpperCase()) || "Overview";

    return (
        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/50 backdrop-blur-md px-6 sticky z-50">

            <div className="flex items-center gap-4">
                {/* Toggle Button */}
                <button onClick={onToggle} className="p-2 rounded-xl text-slate-400 hover:bg-[#161b22] hover:text-white transition-all">
                    <Menu className='h-6 w-6' />
                </button>

                <h1 className="text-sm font-medium text-slate-500 
                hidden sm:block">
                    Dashboard / <span className="text-slate-100">
                        {sectionName === "Dashboard" ? "Overview" : sectionName}
                    </span>
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                        type="search"
                        placeholder="Search analytics..."
                        className="h-11 w-full rounded-xl bg-[#161b22] border-none pl-12 pr-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all shadow-inner"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all rounded-xl">
                        <Bell className="h-6 w-6" />
                        <span className="absolute right-2.5 top-2.5 h-1 w-1 rounded-full bg-blue-500 ring-4 ring-blue-600" />
                    </button>

                    <div className='flex items-center gap-4 group cursor-pointer border-l border-slate-800 pl-6'>
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center ">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-semibold text-white">Admin User</p>
                            <p className="text-[11px] font-medium text-slate-500">Super Admin</p>
                        </div>
                        <ChevronDown className="h-4 w-4 text-slate-600" />
                    </div>

                </div>
            </div>
        </header>
    );
}