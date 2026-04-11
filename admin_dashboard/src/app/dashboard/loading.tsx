import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="spave-y-8  animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="space-y-2 mb-5">
                <Skeleton className="h-10 w-48 bg-slate-800" />
                <Skeleton className="h-4 w-64 bg-slate-800/50" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid gap-6 mb-5 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-36 w-full rounded-2xl bg-slate-800/30" />
                ))}
            </div>

            {/* Large Content Skeleton */}
            <Skeleton className="h-[400px] w-full rounded-2xl bg-slate-800/20" />
        </div>
    )
}