"use client";
import { Calendar } from "lucide-react";

export type TimeRange = "7d" | "30d" | "90d" | "all";

interface TimeRangePickerProps {
    value: TimeRange;
    onChange: (value: TimeRange) => void;
}

export function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
    const ranges: { label: string; id: TimeRange }[] = [
        { label: "7 Days", id: "7d" },
        { label: "30 Days", id: "30d" },
        { label: "3 Months", id: "90d" },
        { label: "All Time", id: "all" },
    ];

    return (
        <div className="flex bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 shadow-sm w-fit">
            {ranges.map((range) => (
                <button
                    key={range.id}
                    onClick={() => onChange(range.id)}
                    className={`
                    px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200
                    ${value === range.id
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                        }
                        `}
                >
                    {range.label}
                </button>
            ))}
        </div>
    )
}