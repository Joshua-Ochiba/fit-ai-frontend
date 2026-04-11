import { User } from "@/types/user";
import { ActivityItem } from "@/types/activity";
import { DashboardStats } from "@/types/dashboard";

const MOCK_DELAY = 800; // Simulate an 800ms network delay

export const dashboardService = {
    getDashboardStats: async (forceError = false): Promise<DashboardStats> => {
        //Simulate network delay
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

        if (forceError) {
            throw new Error("Failed to connect to the Fitness Engine. Please try again.");
        }

        const generateGrowthData = () => {
            return Array.from({ length: 30 }, (_, i) => ({
                date: `2024-05-${(i + 1).toString().padStart(2, '0')}`,
                value: Math.floor(Math.random() * 500) + 1000 + (i * 50)
            }));
        };

        const generateMockUsers = (): User[] => {
            return [

                {
                    id: "1",
                    name: "Alex Johnson",
                    email: "alex.j@example.com",
                    status: "active",
                    fitnessLevel: "Advanced",
                    workoutsLogged: 124,
                    aiInteractions: 45,
                    lastInsight: "Consistency is your superpower.",
                    topExercise: "Deadlift",
                    joinDate: "2024-01-15",
                    lastActive: "2 mins ago",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                },
                {
                    id: "2",
                    name: "Sarah Williams",
                    email: "sarah.w@example.com",
                    status: "active",
                    fitnessLevel: "Intermediate",
                    workoutsLogged: 68,
                    aiInteractions: 29,
                    lastInsight: "Evening workouts are your sweet spot.",
                    topExercise: "Squat",
                    joinDate: "2024-02-10",
                    lastActive: "1 hour ago",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                },
                {
                    id: "3",
                    name: "Michael Chen",
                    email: "m.chen@example.com",
                    status: "warning",
                    fitnessLevel: "Beginner",
                    workoutsLogged: 12,
                    aiInteractions: 8,
                    lastInsight: "Recovery between sets is improving.",
                    topExercise: "Bodyweight Circuit",
                    joinDate: "2024-03-05",
                    lastActive: "2 days ago",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                },
                {
                    id: "4",
                    name: "Emma Davis",
                    email: "emma.d@example.com",
                    status: "inactive",
                    fitnessLevel: "Beginner",
                    workoutsLogged: 7,
                    aiInteractions: 5,
                    lastInsight: "Consistency is key to seeing results.",
                    topExercise: "Walking",
                    joinDate: "2023-11-20",
                    lastActive: "1 month ago",
                },
                {
                    id: "5",
                    name: "James Wilson",
                    email: "james.w@example.com",
                    status: "error",
                    fitnessLevel: "Intermediate",
                    workoutsLogged: 95,
                    aiInteractions: 41,
                    lastInsight: "Keep an eye on your heart rate during cardio.",
                    topExercise: "Running",
                    joinDate: "2024-04-12",
                    lastActive: "Just now",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
                }
            ];

        };

        const generateMockActivity = (): ActivityItem[] => {
            return [
                {
                    id: "a1",
                    type: "signup",
                    user: { name: "John Doe", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
                    action: "joined the platform",
                    timestamp: "5 mins ago"
                },
                {
                    id: "a2",
                    type: "workout",
                    user: { name: "Sarah Williams", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
                    action: "logged a 'Full Body Power' workout",
                    timestamp: "12 mins ago",
                    metadata: "450 kcal burned"
                },
                {
                    id: "a3",
                    type: "alert",
                    user: { name: "System Monitor" },
                    action: "detected a login spike from Europe",
                    timestamp: "1 hour ago"
                },
                {
                    id: "a4",
                    type: "update",
                    user: { name: "Alex Johnson", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
                    action: "updated their fitness goals",
                    timestamp: "3 hours ago"
                },
                {
                    id: "a5",
                    type: "workout",
                    user: { name: "Michael Chen", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
                    action: "completed a 10km run",
                    timestamp: "5 hours ago",
                    metadata: "Personal Best!"
                }
            ];
        };

        return {
            metrics: [
                {
                    title: "Total Users",
                    value: "5,234",
                    trend: "12.5%",
                    trendType: "up",
                    description: "vs last week",
                },
                {
                    title: "Active Users (DAU)",
                    value: "3,892",
                    trend: "8.3%",
                    trendType: "up",
                    description: "vs last week",
                },
                {
                    title: "Workouts Logged",
                    value: "24,567",
                    trend: "15.7%",
                    trendType: "up",
                    description: "vs last week",
                },
                {
                    title: "AI Conversations",
                    value: "12,340",
                    trend: "22.4%",
                    trendType: "up",
                    description: "vs last week",
                },
                {
                    title: "Avg Response Time",
                    value: "1.2s",
                    trend: "5.2%",
                    trendType: "down", // Lower is better for response time
                    description: "vs last week",
                },
                {
                    title: "Error Rate",
                    value: "0.2%",
                    trend: "0.35%",
                    trendType: "down", // Lower is better for errors
                    description: "vs last week",
                }
            ],

            recentUsers: generateMockUsers(),
            recentActivity: generateMockActivity(),
            lastUpdated: new Date().toISOString(),

            userGrowth: generateGrowthData(),
        }
    }
}