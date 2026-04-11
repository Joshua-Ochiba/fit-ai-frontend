import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string;
    trend: string;
    trendType: 'up' | 'down';
    description: string;
}

export function MetricCard({ title, value, trend,
    trendType, description }: MetricCardProps) {
    return (
        <Card className="bg-slate-900/50 border-none shadow-xl overflow-hidden group
        hover:ring-1 hover:ring-blue-500/50 transition-all duration-300
        hover:-translate-y-1  hover:shadow-[0_20px_40px_-15px_rgba(30,41,59,0.5)] 
        transition-all duration-300">
            <CardContent className="p-5">
                <p className="text-sm font-medium text-slate-500">{title}</p>

                <div className="flex items-center justify-between mt-2">
                    <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
                    <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ml-1.5 
                    ${trendType === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                        {trendType === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                        {trend}
                    </div>
                </div>
                <p className="mt-4 text-xs text-slate-600 font-medium">{description}</p>

                {/* Decorative Background Effect */}
                <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-blue-600/5 
                rounded-full blur-3xl group-hover:bg-blue-600/10
                 transition-colors" />
            </CardContent>
        </Card>
    )
}