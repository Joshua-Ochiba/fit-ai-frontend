"use-client";
import { Search, Filter, ChevronDown } from "lucide-react";
import { UserFilters as UserFiltersType } from "@/services/user-service";

interface UserFilterBarProps {
    onFilterChange: (key: keyof UserFiltersType,
        value: string | number) => void;
    currentFilters: UserFiltersType;
}

export function UserFilterBar({ onFilterChange, currentFilters }: UserFilterBarProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-6 p-6
        bg-slate-900/40 rounded-2xl border border-slate-800 shadow-lg">
            {/*Search Box*/}
            <div className="relative flex-1 group">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 
                    h-4 w-4
                     text-slate-500 group-focus-within:text-blue-500 
                     tranition-colors"
                />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl
                    py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2
                    focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
                    value={currentFilters.search}
                    onChange={(e) =>
                        onFilterChange("search", e.target.value)
                    }
                />
            </div>

            {/*Filters Section*/}
            <div className="flex flex-wrap gap-3">
                {/* Fitness Level Filter */}
                <div className="relative group">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
                    text-slate-500 group-hover:text-slate-300 transition-colors" />
                    <select
                        className="bg-slate-950/50 border border-slate-800 rounded-xl 
                    pl-10 pr-10 py-3 text-sm text-slate-300 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500/50 appearance-none 
                    cursor-pointer hover:bg-slate-800/50 transition-all 
                    min-w-[160px]"
                        value={currentFilters.fitnessLevel || ""}
                        onChange={(e) =>
                            onFilterChange("fitnessLevel", e.target.value)
                        }
                    >
                        <option value="">All Fitness Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Elite">Elite</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                    h-4 w-4 text-slate-600 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 
                    -translate-y-1/2 w-2 h-2 
                    rounded-full bg-blue-500/50 animate-pulse" />
                    <select
                        className="bg-slate-950/50 border border-slate-800 rounded-xl 
                    pl-8 pr-10 py-3 text-sm text-slate-300 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500/50 appearance-none 
                    cursor-pointer hover:bg-slate-800/50 transition-all 
                    min-w-[140px]"
                        value={currentFilters.status || ""}
                        onChange={(e) =>
                            onFilterChange("status", e.target.value)
                        }
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2
                    h-4 w-4 text-slate-600 pointer-events-none" />

                </div>
            </div>
        </div>
    )
}