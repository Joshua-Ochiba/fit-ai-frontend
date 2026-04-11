"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { TimeRange } from "./time-range-picker";

interface EngagementFunnelProps {
    timeRange: TimeRange;
}

export function EngagementFunnel({ timeRange }: EngagementFunnelProps) {
    //Mock Data
    const data = [
        { name: 'App Sessions', value: 2400, color: '#3b82f6' },    // Blue
        { name: 'AI Insights Read', value: 1800, color: '#6366f1' }, // Indigo
        { name: 'Workouts Logged', value: 1200, color: '#8b5cf6' },  // Violet
        { name: 'Goal Hit', value: 400, color: '#10b981' },         // Emerald
    ];

    return (
        <div className='bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-lg h-full'>
            <div className='mb-6'>
                <h3 className="text-white font-semibold">
                    User Conversion Funnel
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    From opening the app to hitting fitness goals
                </p>
            </div>

            <div className='h-[300px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout='vertical'
                        data={data}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />

                        <XAxis type='number' hide />

                        <YAxis
                            dataKey="name"
                            type='category'
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            width={120}

                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'
                            }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: '#1e293b', opacity: 0.4 }}
                        />

                        <Bar
                            dataKey="value"
                            radius={[0, 4, 4, 0]}
                            barSize={32}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Stats */}
            <div className='grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/50'>
                <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                        Drop-Off Rate
                    </div>
                    <div className="text-xl 
                    font-bold text-rose-500">
                        24.2%
                    </div>
                </div>

                <div>
                    <div className="text-[10px] uppercase
                     font-bold text-slate-500 tracking-widest mb-1">
                        Conv. Efficacy
                    </div>
                    <div className="text-xl font-bold text-emerald-500">
                        16.7%
                    </div>
                </div>
            </div>
        </div>
    )
}