"use client";
import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Dumbbell,
    HeartPulse,
    Settings,
    FileText,
    Lightbulb,
    LogOut
} from 'lucide-react';

import Image from "next/image";
import fit_ai_icon from "@/assets/fitai.png";
import { usePathname } from "next/navigation";

import { useAuth } from "@/context/auth-context";

/*
const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Workouts', href: '/dashboard/workouts', icon: Dumbbell },
    { name: 'AI Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Insights Engine', href: '/dashboard/insights', icon: Lightbulb },
    { name: 'System Health', href: '/dashboard/health', icon: HeartPulse },
    { name: 'Logs', href: '/dashboard/logs', icon: FileText },
];*/


export function Sidebar({ isCollapsed }: {
    isCollapsed: boolean
}) {
    const { logout } = useAuth();
    const pathname = usePathname();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Users', href: '/dashboard/users', icon: Users },
        { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <aside
            className={`transition-all duration-300 overflow-visible ease-in-out flex flex-col bg-slate-950 text-slate-50 border-r border-slate-800 ${isCollapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo Area */}

            <div className={`flex h-20 items-center px-6 gap-3 overflow-hidden whitespace-nowrap`}>

                <div className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-xl bg-slate-900 shadow-lg">
                    <Image src={fit_ai_icon} alt="Fit.AI Logo" width={48} height={48} className="object-cover scale-110" />
                </div>
                {!isCollapsed && (
                    <span className="text-xl font-bold tracking-tight text-white transition-opacity duration-300">
                        Fit.AI <span className="font-medium text-slate-400">Admin</span>
                    </span>
                )}

            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-2 px-3 py-6">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={isCollapsed ? item.name : ""}
                            className={`group relative flex items-center 
                                rounded-xl px-4 py-4 transition-all duration-300
                                ${isActive
                                    ? "bg-[#090e23] text-white rounded-l-2xl rounded-r-none -mr-3 pr-7"
                                    : "text-slate-400 hover:bg-slate-900/30 hover:text-slate-200 rounded-xl mr-3"}`
                            }
                        >
                            {isActive && !isCollapsed && (
                                <>
                                    {/* BORDER MASK: This hides the sidebar's right border line */}
                                    <div className="absolute top-0 -right-[2px] 
                                    bg-[#090e23] w-[3px] h-full z-10" />

                                    {/* Top Inverted Corner */}
                                    <div className="absolute -top-5 right-0 w-5 h-5
                                         bg-transparent rounded-full 
                                         shadow-[10px_10px_0_0_#090e23] z-20
                                         animate-in fade-in duration-300" />

                                    {/* Bottom Inverted Corner */}
                                    <div className="absolute -bottom-5 right-0 w-5 h-5
                                         bg-transparent rounded-full 
                                         shadow-[10px_-10px_0_0_#090e23] z-20
                                         animate-in fade-in duration-300" />
                                    <div />
                                </>
                            )}

                            <item.icon className={`h-5 w-5 min-w-[20px] ${isActive ? "text-slate-400" : 'group-hover:text-blue-500'
                                }`} />
                            {!isCollapsed ? (
                                <span className="ml-3 text-sm font-medium whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                                    {item.name}
                                </span>
                            ) : (
                                /*Tooltip for collapsed state*/
                                <div className="absolute left-full ml-6 px-3 py-2
                                 bg-slate-800 text-white text-xs font-semibold rounded-md 
                                 opacity-0 group-hover:opacity-100 translate-x-3
                                  group-hover:translate-x-0 transition-all pointer-events-none 
                                whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                                    {item.name}
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2
                                     bg-slate-800
                                     border-l border-b border-slate-700 rotate-45" />
                                </div>
                            )
                            }

                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}

            <div className="border-t border-slate-800 p-3">
                <button
                    onClick={() => logout()}
                    className="w-full group flex items-center rounded-xl px-4 py-3.5 text-slate-500 hover:text-white transition-all hover:bg-slate-900 border-none bg-transparent text-left"
                >
                    <LogOut className="h-5 w-5 text-red-400 min-w-[20px]" />
                    {!isCollapsed && <span className="ml-3.5 text-sm text-red-400 font-bold">Logout</span>}
                </button>
            </div>


        </aside>
    );
}