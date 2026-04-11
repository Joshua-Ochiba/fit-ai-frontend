export type UserStatus = 'active' | 'inactive' | 'warning' | 'error';
export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';

export interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;

    // Domain-Specific Stats (Mapped from Fit.AI Logic)
    fitnessLevel: FitnessLevel;
    workoutsLogged: number;     // Total from workout-log.tsx
    aiInteractions: number;     // Sessions from chatscreen.tsx
    lastInsight: string;        // The "overall_message" from insights.tsx
    topExercise: string;        // Their strongest exercise (e.g., "Bench Press")

    joinDate: string;
    lastActive: string;
    avatarUrl?: string;
}