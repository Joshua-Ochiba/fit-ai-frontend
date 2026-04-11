import { User } from "./user";
import { ActivityItem } from "./activity";

export type TrendType = 'up' | 'down';

export interface MetricData {
  title: string;
  value: string;
  trend: string;
  trendType: TrendType;
  description: string;
}


export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface DashboardStats {
  metrics: MetricData[];
  userGrowth: ChartDataPoint[]; // For the growth chart
  recentUsers: User[];
  recentActivity: ActivityItem[];
  lastUpdated: string;
}