"use client";
import { useState } from "react";
import { TimeRangePicker } from "./time-range-picker";
import { TimeRange } from "./time-range-picker";
import { EngagementFunnel } from "./engagement-funnel";
import { WorkoutTrends } from "./workout-trends";


export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>("7d");

    return (
        <div className="space-y-6  animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Full Analytics</h1>
                <p className="text-slate-400">Deep-dive into gym-goer progress and coaching efficacy.</p>
            </div>

            <TimeRangePicker value={timeRange} onChange={setTimeRange} />



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-full">
                    <EngagementFunnel timeRange={timeRange} />
                </div>

                <div className="h-full">
                    <WorkoutTrends timeRange={timeRange} />
                </div>
            </div>



        </div>
    );
}