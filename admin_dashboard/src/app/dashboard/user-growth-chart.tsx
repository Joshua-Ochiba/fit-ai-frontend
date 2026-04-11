"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartDataPoint } from "@/types/dashboard";
import { useEffect, useState } from "react";

interface UserGrowthChartProps {
    data: ChartDataPoint[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) return <div className="h-[300px] w-full bg-slate-900/10 
    rounded-xl animate-pulse" />;

    return (
        <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1e293b" opacity={0.4} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                        }}
                        minTickGap={30}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0b0e14',
                            border: '1px solid #1e293b',
                            borderRadius: '8px',
                            fontSize: '12px',
                            color: '#f8fafc'
                        }}
                        itemStyle={{ color: '#3b82f6' }}
                        labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                    />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}