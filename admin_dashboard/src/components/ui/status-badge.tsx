import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: 'healthy' | 'warning' | 'error' | 'active' | 'inactive';
    label?: string;
    className?: string;
}

const statusConfig = {
    healthy: {
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        , dot: 'bg-emerald-500'
    },
    active: {
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        , dot: 'bg-blue-500'
    },
    warning: {
        color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        , dot: 'bg-amber-500'
    },
    error: {
        color: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
        , dot: 'bg-rose-500'
    },
    inactive: {
        color: 'bg-slate-500/10 text-slate-500 border-slate-500/20'
        , dot: 'bg-slate-500'
    },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
    const config = statusConfig[status];

    return (
        <Badge variant="outline"
            className={cn("px-2 py-0.5 font-medium rounded-full flex items-center gap-1.5 w-fit", config.color, className)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
            {label || status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )

}