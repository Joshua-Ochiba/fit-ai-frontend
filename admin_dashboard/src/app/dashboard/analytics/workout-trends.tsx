"use client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { TimeRange } from "./time-range-picker";


interface WorkoutTrendsProps {
    timeRange: TimeRange;
}


export function WorkoutTrends({ timeRange }: WorkoutTrendsProps) {
    const data = [
        { day: 'Mon', workouts: 120 },
        { day: 'Tue', workouts: 150 },
        { day: 'Wed', workouts: 180 },
        { day: 'Thu', workouts: 140 },
        { day: 'Fri', workouts: 210 },
        { day: 'Sat', workouts: 250 },
        { day: 'Sun', workouts: 190 },
    ];

    return (
        <div className='bg-slate-900/40 p-6 rounded-2xl border 
        border-slate-800 shadow-lg h-full'>
            <div className='mb-6 flex items-center justify-between'>
                <div>
                    <h3 className="text-white font-semibold">
                        Workout Volume
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Total logs recorded across all gym-goers
                    </p>
                </div>

                <div className="text-right">
                    <div className="text-sm font-bold text-blue-400">+12%</div>
                    <div className="text-[10px] text-slate-600 uppercase font-bold">vs last week</div>
                </div>
            </div>

            <div className='h-[300px] w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            dx={-10}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'
                            }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: '#1e293b', opacity: 0.4 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="workouts"
                            stroke='#3b82f6'
                            strokeWidth={3}
                            fillOpacity={1}
                            fill='url(#colorWorkouts)'
                        />

                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Stats */}
            <div className='grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/50'>
                <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                        Peak Day Volume
                    </div>
                    <div className="text-xl 
                    font-bold text-rose-500">
                        250 <span className='text-xs text-slate-500 font-normal'>Logs</span>
                    </div>
                </div>

                <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                        Avg. Consistency
                    </div>
                    <div className="text-xl font-bold text-blue-500">
                        84%
                    </div>
                </div>
            </div>

        </div>
    )
}