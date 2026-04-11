export type ActivityType = 'signup' | 'workout' | 'alert' | 'update';

export interface ActivityItem {
    id: string;
    type: ActivityType;
    user: {
        name: string;
        avatarUrl?: string;
    };
    action: string;
    timestamp: string;
    metadata?: string;
}
