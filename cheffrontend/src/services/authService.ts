
interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

interface RegisterResponse {
    id: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

interface ApiError {
    message: string;
    status: number;
}

export const registerUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        const error: ApiError = {
            message: errorText || 'Registration failed',
            status: response.status,
        };
        throw error;
    }

    return response.json();
};

const API_BASE_URL = 'http://localhost:8080/api/users';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid email or password');
        }
        throw new Error('Login failed. Please try again.');
    }

    return response.json();
}

