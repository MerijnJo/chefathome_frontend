const API_BASE_URL = "http://localhost:8080/api";

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface UserDetails {
    id: number;
    userId: number;
    firstName: string;
    lastName: string;
    city: string;
    bio: string;
    favouriteCuisine: string;
    dietaryRestrictions: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDetailsInput {
    firstName: string;
    lastName: string;
    city: string;
    bio: string;
    favouriteCuisine: string;
    dietaryRestrictions: string;
}

function getAuthHeaders(): HeadersInit {
    const token = sessionStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
}

export const api = {
    async getCurrentUser(): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        return response.json();
    },

    async getUserDetails(): Promise<UserDetails | null> {
        const response = await fetch(`${API_BASE_URL}/user-details`, {
            headers: getAuthHeaders(),
        });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        return response.json();
    },

    async createUserDetails(data: UserDetailsInput): Promise<UserDetails> {
        const response = await fetch(`${API_BASE_URL}/user-details`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create user details");
        }

        return response.json();
    },

    async updateUserDetails(data: UserDetailsInput): Promise<UserDetails> {
        const response = await fetch(`${API_BASE_URL}/user-details`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to update user details");
        }

        return response.json();
    },

    logout() {
        sessionStorage.removeItem("token");
    },
};
