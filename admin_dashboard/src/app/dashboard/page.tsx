"use client";
import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboard-service";
import { DashboardStats } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { UserGrowthChart } from "./user-growth-chart";

import Image from "next/image";
import { MetricCard } from "@/components/layout/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ChartCard } from "./chart-card";

import { RecentUsersTable } from "./recent-users-table";
import { ActivityFeed } from "./activity-feed";
import Link from "next/link";
import { ErrorState } from "@/components/ui/error-state";
import DashboardLoading from "./loading";


export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboardStats(false);
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (isLoading && !stats) {
    return <DashboardLoading />
  }

  if (error) {
    return (
      <div className="h-[70vh] flex  justify-center">
        <ErrorState message={error} onRetry={loadStats} />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration 700">
      <div>
        <h2
          className="text-3xl font-bold tracking-tight text-white italic"
        >
          Overview
        </h2>
        <p className="text-slate-500 mt-1">Monitor key metrics and system performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? //Show 6 skeletons while loading
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[148px] w-full rounded-xl bg-slate-900/50 border border-slate-800 animate-pulse p-5">
              <div className="h-4 w-24 bg-slate-800 rounded mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-8 w-16 bg-slate-800 rounded" />
                <div className="h-6 w-12 bg-slate-800 rounded-full" />
              </div>
              <div className="h-3 w-32 bg-slate-800 rounded mt-5" />
            </div>
          ))
          : //Render mock data
          stats?.metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              trend={metric.trend}
              trendType={metric.trendType}
              description={metric.description}
            />
          ))
        }
      </div>
      {/* Visual confirmation of the last update */}
      {!isLoading && stats && (
        <div className="text-[10px] text-slate-700 font-mono uppercase tracking-widest text-right">
          Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
        </div>
      )}




      <ChartCard
        title="User Growth"
        description="Daily active users over the last 30 days"
        className="col-span-full border-slate-800"
      >
        <Link href="/dashboard/analytics" className="text-xs font-medium 
            text-blue-500 hover:text-blue-400 hover:cursor-pointer 
            transition-colors">
          View full report
        </Link>

        {isLoading || !stats ? (
          <div className="h-[300px] w-full bg-slate-900/20 animate-pulse rounded-xl" />
        ) : (
          <UserGrowthChart data={stats.userGrowth} />

        )}
      </ChartCard>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Table (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Recent Users
            </h3>
            <Link href="/dashboard/users" className="text-xs font-medium 
            text-blue-500 hover:text-blue-400 hover:cursor-pointer 
            transition-colors">
              View all users
            </Link>
          </div>

          {isLoading || !stats ? (
            <div className="h-[400px] w-full bg-slate-900/20 animate-pulse rounded-xl" />
          ) : (
            <RecentUsersTable users={stats.recentUsers} />
          )
          }
        </div>

        {/* Right: Activity Feed (1/3 width) */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Live Activity</h3>
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 h-fit">
            {isLoading || !stats ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-slate-800/50 animate-pulse rounded-lg" />)}
              </div>
            ) : (
              <ActivityFeed activities={stats.recentActivity} />
            )}
          </div>
        </div>
      </div>


    </div >


  );
}
