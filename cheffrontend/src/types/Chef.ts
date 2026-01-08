// Shared TypeScript interfaces for chef leaderboard feature

export interface Chef {
    id: number;
    name: string;
    profilePicture: string;
    viewCount: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface UseChefLeaderboardReturn {
    chefs: Chef[];
    connectionStatus: ConnectionStatus;
    error: string | null;
}
