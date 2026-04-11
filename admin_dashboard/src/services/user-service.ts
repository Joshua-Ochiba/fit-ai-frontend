import { User } from "@/types/user";


export interface UserFilters {
    search: string;
    fitnessLevel?: string;
    status?: string;
    page: number;
}

const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        status: 'active',
        fitnessLevel: 'Advanced',
        workoutsLogged: 124,
        aiInteractions: 45,
        lastInsight: "Your recovery rate is 15% better on days you hydrate before 8 AM.",
        topExercise: "Deadlift",
        joinDate: '2023-10-12',
        lastActive: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Sarah Kim',
        email: 'sarah.kim@example.com',
        status: 'active',
        fitnessLevel: 'Intermediate',
        workoutsLogged: 68,
        aiInteractions: 29,
        lastInsight: "Your consistency improves when workouts are scheduled before 7 PM.",
        topExercise: "Squat",
        joinDate: '2024-01-05',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    {
        id: '3',
        name: 'Michael Torres',
        email: 'm.torres@example.com',
        status: 'inactive',
        fitnessLevel: 'Beginner',
        workoutsLogged: 12,
        aiInteractions: 8,
        lastInsight: "You perform best with shorter sessions under 30 minutes.",
        topExercise: "Bodyweight Circuit",
        joinDate: '2024-03-18',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString()
    },
    {
        id: '4',
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        status: 'active',
        fitnessLevel: 'Advanced',
        workoutsLogged: 210,
        aiInteractions: 73,
        lastInsight: "Your strength gains peak when rest days follow heavy lower-body sessions.",
        topExercise: "Bench Press",
        joinDate: '2023-08-22',
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
        id: '5',
        name: 'Daniel Okafor',
        email: 'daniel.okafor@example.com',
        status: 'active',
        fitnessLevel: 'Intermediate',
        workoutsLogged: 95,
        aiInteractions: 41,
        lastInsight: "Cardio endurance improves when sessions follow strength workouts on alternate days.",
        topExercise: "Running",
        joinDate: '2023-11-30',
        lastActive: new Date().toISOString()
    },
    {
        id: '6',
        name: 'Emily Carter',
        email: 'emily.carter@example.com',
        status: 'inactive',
        fitnessLevel: 'Beginner',
        workoutsLogged: 7,
        aiInteractions: 5,
        lastInsight: "Starting with low-impact workouts helps maintain weekly consistency.",
        topExercise: "Walking",
        joinDate: '2024-04-10',
        lastActive: new Date().toISOString()
    },
];

export class UserService {
    private static delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

    static async getUsers(filters: UserFilters) {
        await this.delay(800);//Simulating network load

        let filtered = [...MOCK_USERS];


        //Search Logic
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(query)
                ||
                u.email.toLowerCase().includes(query)
            );
        }

        //Multi-parameter Filter Logic
        if (filters.status) filtered =
            filtered.filter(u => u.status === filters.status);

        if (filters.fitnessLevel) filtered = filtered.filter(u => u.fitnessLevel === filters.fitnessLevel);

        // Pagination Logic
        const limit = 10;
        const start = (filters.page - 1) * limit;

        return {
            users: filtered.slice(start, start + limit),
            totalCount: filtered.length,
            totalPages: Math.ceil(filtered.length / limit)
        };
    }
}